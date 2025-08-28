import express from 'express';
import { create_account, login, logout, refresh_auth, verify_token, authenticateJWT } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/create_account', create_account);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh_auth', refresh_auth);
router.get('/verify_token', authenticateJWT, verify_token);

export default router;
