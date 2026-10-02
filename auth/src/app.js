import express from "express";
import morgan from "morgan";
import authRouter from "./router/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json())//middleware to read requests
app.use(morgan("dev"))
app.use(cookieParser())
app.use(
  cors({
    origin: "https://otp-authentication-self.vercel.app",
    credentials: true,
  }),
);

app.use("/api/auth",authRouter)


export default app;