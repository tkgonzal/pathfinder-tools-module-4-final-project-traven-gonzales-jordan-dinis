// useCalcInput.jsx
import { useState } from "react"

import EncounterCalculator from "../data/EncounterCalculator"

// Constants
const encounterCalculator = new EncounterCalculator()

/**
 * Hook to manage inputs of calculator form
 * @returns {Object} An object consisting of:
 * -calcInput: The object used to control the inputs of the CalculatorForm
 * -onInputChange: The main event handler for updating the calcInput when
 *  an input is changed
 * -preventKeypress: An event handler to prevent the user from using 
 *  keypresses on certain inputs in order to prevent invalid inputs
 *  from being set
 */
function useCalcInput() {
    const [calcInput, setCalcInput] = useState(() => ({
        partyLevel: 1,
        partySize: 4,
        threat: "moderate"
    }))

    /**
     * Upon the change of an input element, updates its corresponding
     * member in the calcInput state
     * @param {Event} event The event object for an input change
     */
    function onInputChange(event) {
        const { name, type, value } = event.target

        setCalcInput(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value
        }))
    }

    /**
     * Prevents the user from typing on input
     * @param {Event} event The event object for a keypress
     */
    function preventKeyPress(event) {
        event.preventDefault()
    }

    return {
        calcInput,
        onInputChange,
        preventKeyPress,
        encounterCalculator
    }
}

export default useCalcInput

