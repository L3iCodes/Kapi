import express from 'express'
import { retrieve_products } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/get_all', retrieve_products);

export default router;