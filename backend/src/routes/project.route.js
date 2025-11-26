import express from 'express';
import { getAllProjects, createProject, getUserProjects, updateProject, deleteProject  } from '../controllers/project.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();    
router.get('/showProject',protectRoute, getAllProjects);
router.get('/user/:userId', protectRoute, getUserProjects);
router.post('/createProject', protectRoute, createProject);
router.put('/updateProject/:projectId', protectRoute, updateProject);
router.delete('/deleteProject/:projectId', protectRoute, deleteProject);

export default router;