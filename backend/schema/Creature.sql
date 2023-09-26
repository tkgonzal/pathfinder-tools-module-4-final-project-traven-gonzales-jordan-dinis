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
DROP TABLE Creature;

-- View Table
SELECT * FROM Creature;

UPDATE Encounter
SET name='test2'
WHERE id='494177db-6905-4e51-a00c-8ae84e25b780'