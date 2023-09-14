// Encounter.js
import Creature from "./Creature.js"

// Stores the information for an Encounter as a map of Creatures to their
// quantity within the encounter.

class Encounter {
    /**
     * Generates an encounter given an array of array pairs of Creatures and 
     * associated quantities or another Encounter object
     * @param {[[Creature, Number]], Encounter} encounter Can either be an array of 
     * two element arrays with a Creature object as the first element and an int
     * as the second, or another Encounter object
     */
    constructor(encounter) {
        if (encounter instanceof Encounter) {
            this.creatures = new Map();

            for (let [creature, quantity] of encounter.creatures) {
                this.creatures.set(creature, quantity);
            }
        } else {
            this.creatures = new Map();

            for (let [creature, quantity] of encounter) {
                this.creatures.set(creature, quantity);
            }
        }
    }

    /**
     * Given a Creature object, if the Creature appears in the
     * Encounter's creatures map, increments the amount of that creature
     * in the Encounter by 1
     * @param {Creature} creature 
     */
    incCreatureAmt(creature) {
        if (this.creatures.has(creature)) {
            this.creatures.set(creature,
                this.creatures.get(creature) + 1);
        }
    }

    /**
     * Given a Creature object, if the Creature appears in the
     * Encounter's creatures map, decrements the amount of that creature
     * in the Encounter by 1
     * @param {Creature} creature 
     */
    decCreatureAmt(creature) {
        if (this.creatures.has(creature)) {
            this.creatures.set(creature,
                this.creatures.get(creature) - 1);
        }
    }

    /**
     * Filters out any creatures that do not appear at least once in the
     * encounter
     */
    filterCreatures() {
        const keysToDelete = []

        for (const creature of this.creatures.keys()) {
            if (this.creatures.get(creature) === 0) {
                keysToDelete.push(creature);
            }
        }

        for (const key of keysToDelete) {
            this.creatures.delete(key);
        }
    }
}


export default Encounter;