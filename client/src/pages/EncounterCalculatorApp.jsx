import InfoBar from "../components/InfoBar.jsx"
import CalculatorForm from "../components/CalculatorForm.jsx"
import EncounterPage from "../components/EncounterPage.jsx"


import useCalcInput from "../hooks/useCalcInput.jsx"
import useEncounterDisplay from "../hooks/useEncounterDisplay.jsx"

/**
 * @returns {ReactComponentElement} The content for the EncounterCalculator
 * page/app. A conversion of the main App component from our final project
 * for module 2
 */
function EncounterCalculatorApp() {
    // State Variables and Functions
    const {
        calcInput,
        onInputChange,
        preventKeyPress,
        encounterCalculator
    } = useCalcInput()
    const {
        encounterDisplay,
        setEncounterDisplay,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    } = useEncounterDisplay()

    /**
    * Uses the EncounterCalculator's calculate method to compute 
    * all possible Encounters given the current calcInput state
    * @param {Event} event the event object for a form submit
    */
    function calculate(event) {
        event.preventDefault()
        const calculatedEncounters = encounterCalculator.calculate(
            calcInput.partyLevel,
            calcInput.partySize,
            calcInput.threat
        )
        setEncounterDisplay(({
            encounters: calculatedEncounters,
            page: 0,
            numPages: calculatedEncounters.length,
            partyLevel: calcInput.partyLevel,
            partySize: calcInput.partySize,
            threat: calcInput.threat
        }))
    }

    return (
        <main className="ec-container">
            <InfoBar />
            <CalculatorForm
                calcInput={calcInput}
                onChange={onInputChange}
                preventKeyPress={preventKeyPress}
                calculate={calculate}
            />
            <EncounterPage
                encounterDisplay={encounterDisplay}
                nextPage={nextPage}
                prevPage={prevPage}
                firstPage={firstPage}
                lastPage={lastPage}
                calculator={encounterCalculator}
            />
        </main>
    )
}

export default EncounterCalculatorApp