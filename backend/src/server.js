import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { ENV } from './lib/env.js';
import authRouter from './routes/auth.route.js';
import profileRouter from './routes/profile.route.js';
import { connectDB } from './lib/db.js';

const app = express();


app.use(express.json());   
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/profile", profileRouter);


app.listen(ENV.PORT, () => {
    console.log("Backend is running on PORT ", ENV.PORT);
    connectDB();
})