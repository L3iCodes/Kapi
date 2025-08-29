import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT;
const PORT = process.env.PORT;
console.log(ORIGIN_CLIENT)

const app = express();
app.use(express.json());

// Setup CORS
app.use(cors({
    origin: ORIGIN_CLIENT,
    credentials: true
}));

// Setup Express Server
app.listen(PORT, () => {
    console.log('Server is running at https://localhost:' + PORT)
});


// Authentication Routes
app.use('/api/auth', authRoutes);