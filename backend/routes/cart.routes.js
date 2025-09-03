import express from 'express'
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller.js';
import { authenticateJWT } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/get_cart',authenticateJWT, getCart);
router.post('/add_item',authenticateJWT, addToCart);
router.post('/delete_item',authenticateJWT, deleteFromCart);

export default router;