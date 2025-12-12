import express from "express";
import { 
    sendMessage, 
    getTeamMessages, 
    updateMessage, 
    deleteMessage ,
    getUserTeams
} from "../controllers/message.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/teams", protectRoute, getUserTeams);

// Get paginated messages
router.get("/teams/:teamId", protectRoute, getTeamMessages);



// Send message
router.post("/", protectRoute, sendMessage);

// Update a message
router.put("/:messageId", protectRoute, updateMessage);

// Delete a message
router.delete("/:messageId", protectRoute, deleteMessage);

export default router;
