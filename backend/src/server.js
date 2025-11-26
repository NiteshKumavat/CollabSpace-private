import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { ENV } from './lib/env.js';
import authRouter from './routes/auth.route.js';
import profileRouter from './routes/profile.route.js';
import projectRouter from './routes/project.route.js';
import { connectDB } from './lib/db.js';
import requestRouter from './routes/request.route.js';
import messageRouter from './routes/message.route.js';

const app = express();


app.use(express.json());   
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/project", projectRouter);
app.use("/api/request", requestRouter);
app.use("/api/message", messageRouter);




app.listen(ENV.PORT, () => {
    console.log("Backend is running on PORT ", ENV.PORT);
    connectDB();
})