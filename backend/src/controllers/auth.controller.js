import { generateToken } from "../lib/utils.js"

export const login = (req, res) => {
    const {email, password} = req.body;

    try {
        
    } catch (error) {
        res.statatus(500).json({message : "Internal Server Error"})
    }
}

export const register = () => {
    // TODO : implement register logic
}

export const logout = () => {}