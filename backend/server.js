const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const usersRouter = require("./routes/users.js");

// Server Configuration
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const pool = mysql.createPool({
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_DATABASE
});


// Constants
const PORT = process.env.PORT || 5000;

// Middleware Configuration
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

app.use("/users", usersRouter);


// Run App
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));