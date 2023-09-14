const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.AUTH_PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));