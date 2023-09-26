CREATE TABLE User (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL 
);

-- Debugging
-- Delete tables
-- DROP TABLE User;

-- View Table
-- SELECT * FROM User;