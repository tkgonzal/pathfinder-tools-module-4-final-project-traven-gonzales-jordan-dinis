CREATE TABLE Creature (
    id VARCHAR(36) PRIMARY KEY,
    encounter_id VARCHAR(36) NOT NULL,
    level TINYINT NOT NULL,
    xp INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (encounter_id) REFERENCES Encounter(id)
);

-- Debugging
-- Delete tables
-- DROP TABLE Creature;

-- View Table
-- SELECT * FROM Creature;