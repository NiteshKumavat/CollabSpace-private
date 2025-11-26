import express from 'express';
import { getProfile, updateProfile, blockUser, unblockUser, availability } from '../controllers/profile.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/:Id", protectRoute, getProfile);
router.post("/update", protectRoute, updateProfile);
router.put("/unblock/:userId", protectRoute, unblockUser);
router.put('/block/:userId', protectRoute, blockUser);


export default router;