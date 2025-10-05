import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/submit", protectRoute, createProfile);
router.get("/:id", protectRoute, getProfile);
router.put("/update", protectRoute, updateProfile);

export default router;