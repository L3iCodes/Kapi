import express from 'express'
import { getCart } from '../controllers/cart.controller.js';
import { authenticateJWT } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/get_cart',authenticateJWT, getCart);

export default router;