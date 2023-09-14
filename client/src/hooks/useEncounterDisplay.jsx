// useEncounterDisplay.jsx
import { useState } from "react"

/**
 * Hook to manage the current contents of display for the EncounterPage
 * @returns {Object} An object consisting of
 * -encounterDisplay: The main object defining what information to show the
 *  user on the EncounterPage
 * -setEncounterDisplay: The setter function to set the contents of the
 *  encounterDisplay
 * -nextPage: A function to increment the page variable of the 
 *  encounterDisplay
 * -prevPage: A function to decrement the page attribute of the 
 *  encounterDisplay
 * -firstPage: A function to set the page attribute of the encounterDisplay
 *  to zero
 * -lastPage: A function to set the page attribute of the encounterDisplay
 *  to its last Encounter
 */
function useEncounterDisplay() {
    const [encounterDisplay, setEncounterDisplay] = useState(() => ({
        encounters: [],
        page: 0,
        numPages: 0,
        partyLevel: undefined,
        partySize: undefined,
        threat: undefined
    }))

    /**
     * Increments the encounterDisplay to be the next page
     */
    function nextPage() {
        setEncounterDisplay(prev => ({
            ...prev,
            page: prev.page < prev.numPages - 1 ? prev.page + 1 : prev.page
        }))
    }

    /**
     * Decrements the encounterDisplay to be the previous page
     */
    function prevPage() {
        setEncounterDisplay(prev => ({
            ...prev,
            page: prev.page > 0 ? prev.page - 1 : prev.page
        }))
    }

    /**
     * Sets the encounterDisplay to the first page
     */
    function firstPage() {
        setEncounterDisplay(prev => ({
            ...prev,
            page: 0
        }))
    }

    /**
     * Sets the encounterDisplay to the last page
     */
    function lastPage() {
        setEncounterDisplay(prev => ({
            ...prev,
            page: prev.numPages > 0 ? prev.numPages - 1 : 0
        }))
    }

    return {
        encounterDisplay,
        setEncounterDisplay,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    }
}

export default useEncounterDisplay