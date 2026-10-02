import express from "express"
import { register,getMe,RefreshToken, logout, login , logoutAll, verifyEmail } from "../controller/auth.controller.js";
const authRouter = express.Router();



authRouter.post("/register", register)

authRouter.get("/get-me", getMe)

authRouter.get("/refresh-token", RefreshToken)

authRouter.get("/logout", logout)

authRouter.post("/login", login)

authRouter.get("/log-out", logoutAll)

authRouter.post("/verify-email",verifyEmail)


export default authRouter;
