import express from 'express';
import cors from 'cors';
import { ENV } from './lib/env.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors());

app.use(express.json());    

app.use("/api/auth", authRouter);


app.listen(ENV.PORT, () => {
    console.log("Backend is running on PORT ", ENV.PORT)
})