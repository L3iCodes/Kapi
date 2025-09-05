import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import userRoutes from './routes/user.routes.js'


dotenv.config()
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT;
const PORT = process.env.PORT;
console.log(ORIGIN_CLIENT)

const app = express();
app.use(express.json());
app.use(cookieParser());

// Setup CORS
app.use(cors({
    origin: ORIGIN_CLIENT,
    credentials: true
}));

// Setup Express Server
app.listen(PORT, () => {
    console.log('Server is running at https://localhost:' + PORT)
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);