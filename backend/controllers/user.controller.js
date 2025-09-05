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

export const updateUserInfo = async (req, res) => {
    const {user_id} = req.user;
    const {first_name, last_name, contact_number, email} = req.body;

    console.log('UPDATING', user_id, first_name, contact_number, email)

    try{
        const [result] = await pool.query(
            `UPDATE kapi_database.users
            SET first_name=?, last_name=?, contact_number=?, email=?
            WHERE users.user_id = ?
            ;`,
            [first_name, last_name, contact_number, email, user_id]
        );

        console.log()

        return res.status(201).json({success: true, message:'Update user information', result});
    }catch(error){
        return res.status(401).json({success: false, message:`Failed to update user information`, error});
    };
}
