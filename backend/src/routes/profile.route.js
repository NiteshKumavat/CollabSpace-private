import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/submit", protectRoute, createProfile);
router.get("/:id", protectRoute, getProfile);
router.put("/update", protectRoute, updateProfile);
router.patch("/update", protectRoute, updateProfilePicture);

export default router;