import { generateToken } from "../lib/utils.js"
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Profile from "../models/Profile.js";


export const login = async(req, res) => {
    
    try {
		const {email, password} = req.body;
		

        const newUser = await User.findOne({email});
		
        if(!newUser) return res.status(400).json({message : "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, newUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Credentials"});

        generateToken(newUser._id, res);

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
        });
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}


export const register = async (req, res) => {
    const {fullName, email, password} = req.body;
	try{
		
		if(!fullName || !email || !password) {
			return res.status(400).json({message: "All fields are required"});
		}

		if(password.length < 6){
			return res.status(400).json({message: "Password must be at least 6 characters"});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailRegex.test(email)){
			return res.status(400).json({message: "Invalid email format"});
		}


		const user = await User.findOne({email});
		if (user) return res.status(400).json({message : "User already exists in database"})

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User ({
			fullName,
			email,
			password : hashedPassword
		});

		

		if(newUser){
			
			await newUser.save();
			const newProfile = new Profile({
				user : newUser._id,
				fullName,
				email,
			});

			await newProfile.save();

			generateToken(newUser._id, res);
			res.status(201).json({
				_id : newUser._id,
				fullName : newUser.fullName,
				email : newUser.email,
				isNewUser : true
			});
		}
		else{
			res.status(400).json({message : "Error creating user"});
		}
	}catch(error){
		console.log(error);
		res.status(500).json({message : "INTERNAL SERVER ERROR"})
	}
}

export const logout = async (req, res) => {
    res.cookie("jwt", "", {maxAge : 0});
    res.status(200).json({message : "Logged Out Successfully"})
}