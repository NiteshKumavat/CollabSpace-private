import express from "express";
import {
  getAllProjects,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
  requestToJoin,
  acceptRequest,
  rejectRequest,
} from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllProjects);

router.get("/:userId/projects", protectRoute, getUserProjects);

router.post("/", protectRoute, createProject);

router.put("/:projectId", protectRoute, updateProject);

router.delete("/:projectId", protectRoute, deleteProject);

router.put("/:projectId/request", protectRoute, requestToJoin);

router.put("/:projectId/request/:requestUserId/accept", protectRoute, acceptRequest);


router.put("/:projectId/request/:requestUserId/reject", protectRoute, rejectRequest);


export default router;
