const express = require("express");
const uuid = require("uuid");

// Route Configuration
const encountersRouter = express.Router();

// Helper Functions
/**
 * @param {string} username A user's username in the database
 * @param {Object} db A mysql connection to query from
 * @returns {string} The id of the user based on their username
 */
const getUserId = async (username, db) => {
    const query = await db.query(
        `SELECT id FROM User
         WHERE username=:username`,
        { username }
    );
    
    if (!query[0].length) {
        throw new Error(`There is no user named ${username}`);
    }

    const [[{ id }]] = query;

    return id;
}

// Routes
encountersRouter.post("/add", async (req, res) => {
    try {
        const { username, encounter } = req.body;
        const { creatures } = encounter;

        const userId = await getUserId(username, req.db);
        const encounterId = uuid.v4();

        await req.db.query(
            `INSERT INTO Encounter 
                (id, user_id, name, party_level, party_size, 
                 threat_level, xp_budget)
             VALUES 
                (:id, :userId, :name, :partyLevel, :partySize, 
                 :threatLevel, :xpBudget)`,
            { id: encounterId, userId, ...encounter }
        );

        Promise.all(creatures.map(async ([creature, quantity]) => {
            await req.db.query(
                `INSERT INTO Creature (id, encounter_id, level, xp, quantity)
                 VALUES (:id, :encounterId, :level, :xp, :quantity)`,
                { id: uuid.v4(), encounterId, ...creature, quantity }
            );
        }));

        res.json({status: 200, message: "Encounter added"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = encountersRouter;