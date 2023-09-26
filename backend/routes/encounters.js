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
    const userIdQuery = await db.query(
        `SELECT id FROM User
         WHERE username=:username`,
        { username }
    );
    
    if (!userIdQuery[0].length) {
        throw new Error(`There is no user named ${username}`);
    }

    const [[{ id }]] = userIdQuery;

    return id;
}

/**
 * Throws an error if a user tries to edit or view an encounter that's not
 * theirs
 * @param {string} username A name for a user of the app
 * @param {string} encounterId An id for an encounter
 * @param {Object} db A mysql connection to query from
 */
const validateEncounterEndpointUsage = async (username, encounterId, db) => {
    const userId = await getUserId(username, db);

    const encounterQuery = await db.query(
        `SELECT user_id FROM Encounter
         WHERE id = :encounterId`,
        { encounterId }
    );

    const [[{ user_id: encounterUserId }]] = encounterQuery;

    if (encounterUserId !== userId) {
        throw new Error("Cannot edit or retrieve Encounter unless its owned by the current user");
    }
}

// Routes
encountersRouter.get("/", async (req, res) => {
    try {
        const { username } = req.body;
        const userId = await getUserId(username, req.db);

        const encountersQuery = await req.db.query(
            `SELECT * FROM Encounter
             WHERE user_id = :userId`,
            { userId }
        );

        const [encounters] = encountersQuery;

        res.json({ 
            status: 200,
            encounters,
            message: "Encounters retrieved" 
        });
    } catch (error) {
        res.json({ status: 500, error, message: error.message });
    }
});

encountersRouter.get("/:encounterId", async (req, res) => {
    try {
        const { encounterId } = req.params;
        const { username } = req.body;

        await validateEncounterEndpointUsage(username, encounterId, req.db);

        const creaturesQuery = await req.db.query(
            `SELECT * FROM Creature
             WHERE encounter_id = :encounterId`,
            { encounterId }
        );

        const [creatures] = creaturesQuery;
        
        // Processes the retrieved creatures into an array of 
        // 2 element arrays consisting of [creature, quantity]
        // such that it is formatted properly for the client
        const processedCreatures = creatures.map(
            creature => [
                {
                    level: creature.level,
                    xp: creature.xp
                },
                creature.quantity
            ]
        );

        res.json({ 
            status: 200, 
            encounterCreatures: processedCreatures,
            message: "Creatures for encounter retrieved" 
        });
    } catch (error) {
        res.json({ status: 500, error, message: error.message });
    }
});

encountersRouter.put("/rename/:encounterId", async (req, res) => {
    try {
        const { encounterId } = req.params;
        const { username, newEncounterName } = req.body;

        await validateEncounterEndpointUsage(username, encounterId, req.db);

        await req.db.query(
            `UPDATE Encounter
             SET name = :newEncounterName
             WHERE id = :encounterId`,
            { encounterId, newEncounterName }
        );

        res.json({ 
            status: 200, 
            message: `Encounter name changed to ${newEncounterName}`
        });
    } catch (error) {
        res.json({ status: 500, error, message: error.message });
    }
});

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

        res.json({ status: 200, message: "Encounter added" });
    } catch (error) {
        res.json({ status: 500, error, message: error.message });
    }
});

module.exports = encountersRouter;