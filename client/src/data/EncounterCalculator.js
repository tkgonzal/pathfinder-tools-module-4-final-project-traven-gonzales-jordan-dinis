// EncounterCalculator.js
import Creature from "./Creature.js";
import Encounter from "./Encounter.js";

// Calculates all possible encounters for a given party level, party
// party size, and threat level according Pathfinder 2e's encounter
// building rules which can be read here:
// https://2e.aonprd.com/Rules.aspx?ID=497

class EncounterCalculator {
    /**
     * Given the partyLevel, partySize, and threat level for a desired
     * encounter, returns an array of all valid encounters for the given
     * parameters.
     * @param {int} partyLevel The level of a party
     * @param {int} partySize The size of a party
     * @param {String} threat The string denoting the general threat level
     * of an encounter
     * @returns {[Encounter]} An array of all possible encounters given 
     * the aforementioned constraints
     */
    calculate(partyLevel, partySize, threat) {
        const xpBudget = this.determineXPBudget(partySize, threat);
        const creatureTable = this.makeCreatureTable(partyLevel, xpBudget);
        // Array used as the subproblem storer for calculations. Meant to contain the
        // current array being calculated. Initially, no creatures in the creature
        // table are present in the encounter
        const baseEncounter = new Encounter(creatureTable
            .map(creature => [creature, 0]))
        const encounters = []

        this.calculateAlgorithm(xpBudget, creatureTable, baseEncounter, 0, encounters);

        return encounters;
    }

    /**
     * Using a variation of the Knapsack and Coin Change Algorithm, recursively builds
     * encounters under the constraints of the creature table and xp budget to calculate
     * all valid encounters
     * @param {int} xpBudget The remaining XP used to build an encounter
     * @param {[Creature]} creatureTable An array of all possible
     * creatures in an encounter
     * @param {Encounter} currEncounter The current encounter being 
     * considered for calculation
     * @param {int} start The start index of the creatureTable
     * from where to consider to eliminate redundant looping
     * @param {[Encounter]} encounters The array to store all valid
     * calculated encounters so far
     */
    calculateAlgorithm(xpBudget, creatureTable, currEncounter, start, encounters) {
        if (xpBudget < creatureTable[creatureTable.length - 1].xp) {
            const validEncounter = new Encounter(currEncounter);
            validEncounter.filterCreatures()
            encounters.push(validEncounter);
        } else {
            for (let i = start; i < creatureTable.length; i++) {
                const currCreature = creatureTable[i];
                if (currCreature.xp <= xpBudget) {
                    currEncounter.incCreatureAmt(currCreature);
                    this.calculateAlgorithm(xpBudget - currCreature.xp,
                        creatureTable, currEncounter, i, encounters);
                    currEncounter.decCreatureAmt(currCreature);
                }
            }
        }
    }

    /**
     * Given the partyLevel of a party and an xpBudget for an encounter,
     * determines all the available monster usable in the encounter
     * @param {int} partyLevel The level of the party
     * @param {int} xpBudget The total XP used to build an encounter
     * @returns {[Creature]} creatureTable, An array of all possible creatures
     * in an encounter
     */
    makeCreatureTable(partyLevel, xpBudget) {
        const table = [];
        // The pairs of all XP costs to Creature level relative to the party.
        // Can be viewed here:
        // https://2e.aonprd.com/Rules.aspx?ID=499
        const xpPairs = [
            [160, 4],
            [120, 3],
            [80, 2],
            [60, 1],
            [40, 0],
            [30, -1],
            [20, -2],
            [15, -3],
            [10, -4],
        ];

        for (const [xp, levelMod] of xpPairs) {
            if (xp <= xpBudget) {
                if (partyLevel <= 2 && xp == 10) break;
                if (partyLevel == 1 && xp == 15) break;

                table.push(new Creature(partyLevel + levelMod, xp));
            }
        }

        return table;
    }

    /**
     * Given partySize and threat level, determines the XP budget for 
     * an encounter. 
     * @param {int} partySize The amount of players in a party
     * @param {String} threat The string denoting the general threat level
     * of an encounter
     * @returns {int} xpBudget, The total XP used to build an encounter
     */
    determineXPBudget(partySize, threat) {
        switch (threat) {
            case "trivial":
                return 20 + (partySize - 2) * 10;
            case "low":
                return 30 + (partySize - 2) * 15;
            case "moderate":
                return 40 + (partySize - 2) * 20;
            case "severe":
                return 60 + (partySize - 2) * 30;
            case "extreme":
                return 80 + (partySize - 2) * 40;
        }
    }
}


export default EncounterCalculator;