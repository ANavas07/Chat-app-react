import { Router } from 'express';
import {signupUser, loginUser, logoutUser} from '../controllers/auth.controller.js';

const router = Router();

//routes configuration
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);

export default router;