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

export const addToCart = async (req, res) => {
    const {user_id} = req.user;
    const { productId, quantity } = req.body;

    try{
        const [result] = await pool.query(
            `INSERT INTO kapi_database.user_items(user_id, product_id, quantity)
            VALUE (?,?,?)
            ;`,
            [user_id, productId, quantity]
        );

        return res.status(201).json({success: true, message:'Succesfully added item to the cart', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to add item to cart`, error});
    };
};


export const deleteFromCart = async (req, res) => {
    const { cart_id } = req.body;

    try{
        const [result] = await pool.query(
            `DELETE from kapi_database.user_items
            WHERE user_item_id = ?
            ;`,
            [cart_id]
        );

        return res.status(201).json({success: true, message:'Succesfully deleted item in the cart', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to delete item in cart`, error});
    };
};

export const updateItemQty = async (req, res) => {
    const { cart_id, quantity } = req.body;

    try{
        const [result] = await pool.query(
            `UPDATE kapi_database.user_items
            SET quantity = ?
            WHERE user_item_id = ?
            ;`,
            [quantity, cart_id]
        );

        return res.status(201).json({success: true, message:'Succesfully updated item qty in the cart', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to update item qty in cart`, error});
    };
};

export const checkout = async (req, res) => {
    const {user_id} = req.user;
    const orders = req.body;
    // console.log(orders.tax)
    // console.log(orders)
    // console.log('USER ', user_id)

    try{
        // Create order id
        const [order] = await pool.query(
            `INSERT INTO kapi_database.orders(user_id, tax, delivery, total)
            VALUES (?,?,?,?)
            ;`,
            [user_id, orders.tax, orders.deliveryCost, orders.total]
        )
        
        // Create bulk item list
        const orderId = order.insertId;
        const orderItems = orders.items.map(item => [
            orderId,
            item.product_id,
            item.quantity,
            item.price
        ])


        // Place order
        const [result] = await pool.query(
            `INSERT INTO kapi_database.order_items(order_id, product_id, quantity, price)
            VALUES ?
            ;`,
            [orderItems]
        );

        // Update stock for each product
        for (const item of orders.items) {
            await pool.query(
                `UPDATE kapi_database.products 
                SET stock = stock - ? 
                WHERE product_id = ? AND stock >= ?`,
                [item.quantity, item.product_id, item.quantity]
            );
        }

        return res.status(201).json({success: true, message:'Succesfully placed order', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to place order`, error});
    };
};