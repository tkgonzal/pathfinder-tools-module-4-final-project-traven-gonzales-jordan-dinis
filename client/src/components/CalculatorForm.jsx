// CalculatorForm.jsx
import "./CalculatorForm.css"

// The Form element that takes the user's input for the Encounter
// Calculator
function CalculatorForm(props) {
    return (
        <form className="calc-form" onSubmit={props.calculate}>
            <div className="calc-form--top">
                <h2 className="calc-form--header">
                    Calculator
                </h2>
                <hr />
            </div>
            <div className="calc-form--content">
                <div className="calc-form--inputs">
                    <span>
                        <label htmlFor="partyLevel">Party Level: </label>
                        <input
                            name="partyLevel"
                            type="number"
                            min="1"
                            max="20"
                            value={props.calcInput.partyLevel}
                            onKeyPress={(event) => props.preventKeyPress(event)}
                            onChange={(event) => props.onChange(event)}
                            required
                        />
                    </span>

                    <span>
                        <label htmlFor="partySize">Party Size:</label>
                        <input
                            name="partySize"
                            type="number"
                            min="2"
                            max="10"
                            value={props.calcInput.partySize}
                            onKeyPress={(event) => props.preventKeyPress(event)}
                            onChange={(event) => props.onChange(event)}
                            required
                        />
                    </span>

                    <span>
                        <label htmlFor="threatLevel">Threat Level:</label>
                        <select
                            name="threat"
                            value={props.calcInput.threat}
                            onChange={(event) => props.onChange(event)}
                            required
                        >
                            <option value="trivial">Trivial</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                            <option value="extreme">Extreme</option>
                        </select>
                    </span>
                </div>

                <button
                    type="submit"
                >
                    Calculate
                </button>
            </div>
        </form>
    )
}

export default CalculatorForm

