import express from 'express'
import { authenticateJWT } from '../controllers/auth.controller.js';
import { updateUserInfo } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update_user',authenticateJWT, updateUserInfo);

export default router;