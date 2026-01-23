import express from "express";
import { 
    sendMessage, 
    getTeamMessages, 
    getUserTeams, 
    updateMessage, 
    deleteMessage 
} from "../controllers/message.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Matches frontend: axios.get("/message/teams")
router.get("/teams", protectRoute, getUserTeams);

// Matches frontend: axios.get("/message/teams/:teamId")
router.get("/teams/:teamId", protectRoute, getTeamMessages);

// Matches frontend: axios.post("/message")
router.post("/", protectRoute, sendMessage);

// Update/Delete placeholders
router.put("/:messageId", protectRoute, updateMessage);
router.delete("/:messageId", protectRoute, deleteMessage);

export default router;