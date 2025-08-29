import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config();


// Initialize Database
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'kapi_database'
});


// Account Creation
export const create_account = async (req,res) => {
    const {name, email, password} = req.body; // Account information object

    try{
        const hashed_password = await bcrypt.hash(password, 10);
        
        // Insert new user into the DB
        const [result] = await pool.query(
            'INSERT INTO kapi_database.users (name, email, password) VALUE (?,?,?)',
            [name, email, hashed_password]
        );

        // Create cart for the user
        await pool.query(   
            'INSERT INTO kapi_database.carts (user_id) VALUE (?)',
            [result.insertId]
        );

        return res.status(201).json({success: true, message:'Succesfully Created Acccount', result});

    }catch(error){
        if(error.code === 'ER_DUP_ENTRY') return res.status(401).json({success: false, message:'Account already exists', error});
        return res.status(401).json({success: false, message:`Can't connect to database. Please try again later`, error});
    };
};


// Login Function
export const login = async (req, res) => {
    const {email, password} = req.body;
    const SECRET = process.env.SECRET;

    try{
        const [user] = await pool.query(
            'SELECT * FROM kapi_database.users WHERE email = ?',
            [email]
        );

        // Check if use exists
        if (user.length < 1) {
            return res.status(401).json({success: false, message:`User does not exists`});
        }

        // Check if password matches
        const match = await bcrypt.compare(password, user[0].password)
        if(!match){
            return res.status(401).json({success: false, message:`Incorrect password or email`});
        }

        const user_info = {
            user_id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role,
        }
        
        // Create Access Token
        const access_token = jwt.sign(
            user_info,
            SECRET,
            {expiresIn: '1d'}
        )

        // Create Refresh Token
        const refresh_token = jwt.sign(
            user_info,
            SECRET,
            {expiresIn: '7d'}
        )

        // Store refresh token
        res.cookie("jwt", refresh_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({success: true, message:'Succesfully Logged in', result: {token: access_token, user: user_info} });
    }catch(error){
        return res.status(401).json({success: false, message:`Can't connect to database. Please try again later`, error});
    };
};


// Refresh authentication
export const refresh_auth = (req, res) => {
    const cookies = req.cookies;

    // Check if there is a refresg token
    if(!cookies?.jwt){
        return res.status(401).json({success:false, message: 'No refresh token found'});
    };

    const refresh_token = cookies.jwt;
    const SECRET = process.env.SECRET;

    // Verify refresh token
    jwt.verify(refresh_token, SECRET, (err,decoded) => {
        if (err) return res.status(401).json({success:false, message: 'Invalid refresh token found'});

        // Generate new access token
        const access_token = jwt.sign(
            {user_id: decoded.user_id, name: decoded.name, email: decoded.email, role: decoded.role},
            SECRET,
            {expiresIn: '15m'}
        );

        return res.json({ access_token });
    });
}


// Authenticate token validity
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({success:false, message: 'No authorization headers'});
    }

    const token = authHeader.split(" ")[1] //Bearer <token>
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) res.status(401).json({success:false, message: 'Invalid token'});

        // Continue and asign user to req.user
        req.user = user;
        next();
    })
}


// Verify token if useable
export const verify_token = async (req, res) => {
    return res.status(200).json({ message: "You are authenticated!", user: req.user });
};


// Logout function
export const logout = async (_req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    return res.status(200).json({ success: true, message: "Logged out" });
};
