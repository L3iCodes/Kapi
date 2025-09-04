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

export const getOrders = async (req, res) => {
    const {user_id} = req.user;

    try{
        const [result] = await pool.query(
            `SELECT o.order_id,
                o.user_id,
                o.order_date,
                o.status,
                o.tax,
                o.delivery,
                o.total,
            CASE
                WHEN COUNT(oi.order_item_id) = 0 THEN JSON_ARRAY()
                ELSE JSON_ARRAYAGG(
                    JSON_OBJECT(
                            'order_item_id', oi.order_item_id,
                            'product_id', oi.product_id,
                            'product_name', p.name,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'subtotal', oi.quantity * oi.price
                        )
                )
            END AS items
            FROM kapi_database.order_items AS oi
            JOIN kapi_database.orders AS o
                ON o.order_id = oi.order_id
            JOIN kapi_database.products AS p
                ON p.product_id = oi.product_id
            WHERE o.user_id = ?
            GROUP BY o.order_id, o.user_id, o.order_date, o.status, o.tax, o.delivery, o.total
            ORDER BY o.order_date DESC;`,
            [user_id]
        );

        return res.status(201).json({success: true, message:'Orders retrieved', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to retrieve orders`, error});
    };
};