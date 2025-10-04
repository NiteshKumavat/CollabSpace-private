import express from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';


const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);


//TODO : create a route for profile form submission and fetching and updating the user profile

export default router;