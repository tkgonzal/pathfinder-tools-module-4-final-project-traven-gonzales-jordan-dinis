const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

// Route Configuration
const usersRouter = express.Router();
require("dotenv").config();

// Authorization Helper Functions
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3h"});
}

// Middleware
/**
 * Authenticates a user's token.
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next middleware to call 
 * @returns {Object} If there is an error in verifying the user's token, the response
 * object is returned to indicate an invalid access token
 */
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
// Registers user to the app
usersRouter.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(
            req.body.password, process.env.SALT
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

        const accessToken = generateAccessToken(user);
    
        res.json({ 
            status: 200,
            accessToken,
            username, 
            message: "User added to app"
        });
    } catch (error) {
        res.json({ status: 500, error: error, message: error.message });
    }
});

// Logs user back into the app
usersRouter.post("/login", async (req, res) => {
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
                username, 
                message: "User logged in"
            });
        } else {
            res.json({ status: 400, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
});

module.exports = { usersRouter, authenticateToken };