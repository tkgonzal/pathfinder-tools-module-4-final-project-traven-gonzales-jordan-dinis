const express = require("express");
const cors = require("cors");

const getDatabaseConnection = require("./config/sqlDbConfig.js");

const { 
    usersRouter,
    authenticateToken
} = require("./routes/users.js");
const encountersRouter = require("./routes/encounters.js");

// Server Configuration
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "*",
    "Access-Control-Allow-Headers": "*",
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Constants
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(getDatabaseConnection);

// Route Configuration
app.use("/users", usersRouter);
app.use("/encounters", authenticateToken, encountersRouter);

// Run App
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));