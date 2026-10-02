import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js";
import config from "../config/config.js";
import bcrypt from "bcryptjs";
import crypto, { setEngine } from "node:crypto";
import sessionModel from "../model/session.model.js";
import { sendOtpEmail } from "../services/email.service.js";    
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import otpModel from "../model/otp.model.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            {email}
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message:(email === isAlreadyRegistered.email)?"email already exists":"username already exists"
        })
    }

    const user =  await userModel.create({
        username: username,
        email: email,
        password:password
    })

    const otp = generateOTP();
    const html = getOtpHtml(otp);

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    await otpModel.create({
        email:email,
        user: user._id,
        otpHash
    })

    await sendOtpEmail(email, otp);
    
    return res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}

export async function login(req, res) {

    const{username,password} = req.body
    
    const user = await userModel.findOne({username})

    if (!user) {
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    if (!user.verified) {
        return res.status(401).json({
            message:"user not verified"
        })
    }

    const isPassword = user.comparePassword(password);

    if (!isPassword) {
        return res.status(409).json({
            message:"invalid password"
        })
    }

    const refreshToken = jwt.sign({
        id: user._id,
        username:user.username
    }, config.jwt_secret, {
        expiresIn:"7d"
    })

    const refreshTokenHash =crypto
      .createHash("sha256")
      .update(refreshToken)
        .digest("hex");
    
    const session = await sessionModel.create({
      user: user._id,
      RefreshTokenHash: refreshTokenHash,
      ip: req.ip,
      useragent: req.headers["user-agent"],
    });
    
    const AccessToken = jwt.sign(
      {
        id: user._id,
        session:session._id
      },
      config.jwt_secret,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("Refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            verified:user.verified
        },
        AccessToken
    })
    


 }

export async function RefreshToken(req, res) {
    const refreshToken = req.cookies.Refreshtoken

    if (!refreshToken) {
        return res.status(401).json({
            message:"token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.jwt_secret)

    const refreshtokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    
    const session = await sessionModel.findOne({
        RefreshTokenHash:refreshtokenHash,
        revoked:false
    })

    if (!session) {
        return res.status(401).json({
            message:"invalid refresh token"
        })
    }
    
    const accessToken =  jwt.sign({
        id: decoded.id,
        session:session._id
    }, config.jwt_secret, {
        expiresIn:"15m"
    })

    const newRefreshtoken = jwt.sign({
        id: decoded.id,
        username:decoded.username
    }, config.jwt_secret, {
        expiresIn:"7d"
    })

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshtoken)
      .digest("hex");

    session.RefreshTokenHash = newRefreshTokenHash
    await session.save();
    

    res.cookie("Refreshtoken",newRefreshtoken)

    return res.status(200).json({
        message: "access token generated successfully",
        user: {
            user:decoded.username
        },
        accessToken
    })
}


export async function getMe(req, res) {
    
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(404).json({
            message:"token not found"
        })
    }

    const decoded = jwt.verify(token, config.jwt_secret);

    // console.log(decoded)

    return res.status(200).json({
        message: "info fetched successfully",
        user: {
            userid: decoded.id,
            username: decoded.username
        }
    })
}

export async function logout(req, res) {
    const refreshToken = req.cookies.Refreshtoken

    if (!refreshToken) {
        return res.status(404).json({
            message:"refresh token not found"
        })
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.findOne({
        RefreshTokenHash:refreshTokenHash,
        revoked:false
    })

    if (!session) {
        return res.status(404).json({
            message:"invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("Refreshtoken")

    return res.status(200).json({
        message:"user logged out successfully"
    })
}

export async function logoutAll(req, res) {
    const refreshToken = req.cookies.RefreshToken

    if (!refreshToken) {
        return res.status(404).json({
            message:"no token found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.jwt_secret)
    
    await sessionModel.updateMany({
        user: decoded.id,
        revoked:false
    }, {
        revoked:true
    })

    res.clearCookie("Refreshtoken")

    return res.status(200).json({
        message:"all loggedout successfully"
    })
}

export async function verifyEmail(req, res) {
    const { otp, email } = req.body
    
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
        .digest("hex");
    
    const otpDoc = await otpModel.findOne({
        email,
        otpHash
    })

    if (!otpDoc) {
        return res.status(404).json({
            message:"Invalid OTP"
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
        verified:true
    })

    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message: "email verified successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}