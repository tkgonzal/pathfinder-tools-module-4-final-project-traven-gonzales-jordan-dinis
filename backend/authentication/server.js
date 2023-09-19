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
    
        res.json({ meme: "meme" });
    } catch (error) {
        res.json({ status: 500, error: error });
    }
});

app.listen(PORT, () => console.log(`Auth Server start on port ${PORT}`));