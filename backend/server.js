const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const getDatabaseConnection = require("./config/sqlDbConfig.js");

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

// Constants
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(getDatabaseConnection);

// Route Configuration
app.use("/users", usersRouter);


// Run App
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));