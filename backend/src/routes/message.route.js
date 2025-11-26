import express from 'express';
import { getAllMessages, createMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();    
router.get('/showMessages', protectRoute, getAllMessages);
router.post('/createMessage', protectRoute, createMessage);

export default router;