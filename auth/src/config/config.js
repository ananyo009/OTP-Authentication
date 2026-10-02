import dotenv from "dotenv"

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("mongodb url does not exists");
}

if (!process.env.JWT_SECRET) {
    throw new Error("jwt secret does not exists")
}

if (!process.env.REFRESH_TOKEN) {
     throw new Error("refresh token does not exists");
}

if (!process.env.CLIENT_ID) {
     throw new Error("client id does not exists");
}

if (!process.env.CLIENT_SECRET) {
     throw new Error("client secret does not exists");
}

if (!process.env.GOOGLE_USER) {
     throw new Error("google user does not exists");
}

const config = {
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.client_secret,
    google_user: process.env.GOOGLE_USER,
    refresh_token: process.env.REFRESH_TOKEN

}

export default config