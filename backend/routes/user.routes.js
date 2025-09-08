import express from 'express'
import { authenticateJWT } from '../controllers/auth.controller.js';
import { updateUserInfo, updateUserAddress } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update_user',authenticateJWT, updateUserInfo);
router.post('/update_address',authenticateJWT, updateUserAddress);

export default router;