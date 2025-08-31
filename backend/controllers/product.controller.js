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

export const retrieve_products = async (req, res) => {
    try{
        const [result] = await pool.query(
            `SELECT pr.*, ca.category_id, ca.name as category 
            FROM kapi_database.product_categories AS pc
            JOIN kapi_database.products as pr
                ON pc.product_id = pr.product_id
            JOIN kapi_database.categories as ca
                ON pc.category_id = ca.category_id
            ;
            `
        );

        return res.status(201).json({success: true, message:`Products retrieve`, result});

    }catch(error){
        return res.status(401).json({success: false, message:`Failed to retrieve product`, error});
    };
};