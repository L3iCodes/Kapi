import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();

// Initialize Database
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'kapi_database'
});

export const getCart = async (req, res) => {
    const {user_id} = req.user;

    try{
        const [result] = await pool.query(
            `SELECT cart.user_item_id, product.*, cart.quantity
            FROM kapi_database.user_items AS cart
            JOIN kapi_database.products AS product
                ON cart.product_id = product.product_id
            WHERE cart.user_id = ?
            ;`,
            [user_id]
        );

        return res.status(201).json({success: true, message:'Cart items retrieved', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to retrieve cart`, error});
    };
};