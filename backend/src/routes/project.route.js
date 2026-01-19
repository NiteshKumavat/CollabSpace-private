import express from "express";
import {
  getAllProjects,
  getUserProjects,
  createProject,
  updateProject,
  leaveProject,
  deleteProject,
  requestToJoin,
  acceptRequest,
  generateProjectAI,
  rejectRequest,
} from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllProjects);

router.get("/:userId/projects", protectRoute, getUserProjects);

router.post("/", protectRoute, createProject);

router.put("/:projectId", protectRoute, updateProject);

router.put("/:projectId/leave", protectRoute, leaveProject);

router.delete("/:projectId", protectRoute, deleteProject);

router.put("/:projectId/request", protectRoute, requestToJoin);

router.put("/:projectId/request/:requestUserId/accept", protectRoute, acceptRequest);

router.post("/generate-ai", protectRoute, generateProjectAI);
router.put("/:projectId/request/:requestUserId/reject", protectRoute, rejectRequest);


export default router;
