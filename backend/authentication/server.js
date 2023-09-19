const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const uuid = require("uuid");

// Server Configuration
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

const pool = mysql.createPool({
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_DATABASE
});

// Constants
const PORT = process.env.AUTH_PORT || 5000;
const SALT = 10;

// DB Pool Middleware Configuration
app.use(async function(req, res, next) {
    try {
        req.db = await pool.getConnection();
        req.db.connection.config.namedPlaceholders = true;

        await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
        await req.db.query(`SET time_zone = '-8:00'`);

        await next();

        req.db.release();
    } catch (err) {
        console.log(err);

        if (req.db) req.db.release();
        throw err;
    }
});

// Authorization Helper Functions
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

// Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json({
            status: 401, 
            message: "No access token given"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
        (err, user) => {
            if (err) {
                return res.json({
                    status: 403, 
                    message: "Invalid access token given"
                });
            }

            req.user = user;
            next();
        }    
    )
}

// Routes
app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(
            req.body.password, SALT
        );
            
        const user = { 
            id: uuid.v4(),
            username: req.body.username, 
            password: hashedPassword
        };
    
        await req.db.query(
            `INSERT INTO User (id, username, password)
             VALUES (:id, :username, :password)`,
             user
        );
    
        res.json({ status: 200, message: "User added to app"});
    } catch (error) {
        res.json({ status: 500, error: error, message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userResult = await req.db.query(
            `SELECT * from User
             WHERE username = :username`,
            { username }
        );

        if (!userResult[0].length) {
            return res.json({ 
                status: 400, 
                message: `${username} is not a valid user`
            });
        }

        const [[user]] = userResult;

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = generateAccessToken(user);

            res.json({ 
                status: 200,
                accessToken,
                message: "User logged in"
            });
        } else {
            res.json({ status: 200, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
});

// Run App
app.listen(PORT, () => console.log(`Auth Server start on port ${PORT}`));