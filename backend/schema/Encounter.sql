CREATE TABLE Encounter (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    party_level TINYINT NOT NULL,
    party_size TINYINT NOT NULL,
    threat_level VARCHAR(8) NOT NULL,
    xp_budget INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Debugging
-- Delete tables
DROP TABLE Encounter;

-- Delete all entries from table
TRUNCATE TABLE Encounter;

-- View Table
SELECT * FROM Encounter;