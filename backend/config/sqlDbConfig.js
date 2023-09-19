const mysql = require("mysql2/promise");

// Env Config
require("dotenv").config();

// Pool Config
const pool = mysql.createPool({
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_DATABASE
});

/**
 * The middleware to call to query from the MySQL 
 * pool
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The next middleware to call
 */
const getDatabaseConnection = async (req, res, next) => {
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
}

module.exports = getDatabaseConnection;