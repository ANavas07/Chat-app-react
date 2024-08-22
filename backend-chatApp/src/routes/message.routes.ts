import {Router} from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.middleware.js';

const router = Router();

//protect route: i need to be secure that the user is logged in to send a message
router.post('/send/:id', protectRoute , sendMessage);
router.get('/:id', protectRoute , getMessages);

export default router;