import { generateToken } from "../lib/utils.js"
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const newUser = await User.findOne(email);
        if(!newUser) return res.status(400).json({message : "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, newUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Credentials"});

        generateToken(newUser._id, res);

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic
        });
    } catch (error) {
        console.log("Error in login : ", error)
        res.statatus(500).json({message : "Internal Server Error"})
    }
}

