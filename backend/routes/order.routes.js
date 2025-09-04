import express from 'express'
import { authenticateJWT } from '../controllers/auth.controller.js';
import { getOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/get_orders',authenticateJWT, getOrders);

export default router;