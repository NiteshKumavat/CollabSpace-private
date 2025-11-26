import express from 'express';
import { getAllRequests, createRequest, updateRequest, deleteRequest } from '../controllers/request.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/showRequests', protectRoute, getAllRequests);
router.post('/createRequest', protectRoute, createRequest);
router.put('/updateRequest', protectRoute, updateRequest);
router.delete('/deleteRequest', protectRoute, deleteRequest);    


export default router;