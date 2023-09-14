// EncounterPage.jsx
import { nanoid } from "nanoid"

import Creature from "./Creature.jsx"
import EncounterPageNavButton from "./EncounterPageNavButton.jsx"

import "./EncounterPage.css"

import backImg from "../assets/backward-step.svg"
import firstImg from "../assets/backward-fast.svg"
import nextImg from "../assets/forward-step.svg"
import lastImg from "../assets/forward-fast.svg"

// The portion of the app that displays each encounter calculated, one
// at a time. Uses the encounterDisplay state to determine which
// encounter to display at a time.
function EncounterPage(props) {
    const notEmpty = props.encounterDisplay.numPages > 0
    let creatures = []

    if (notEmpty) {
        const currEncounter = props.encounterDisplay.encounters[
            props.encounterDisplay.page
        ]

        for (const [creature, quantity] of currEncounter.creatures) {
            creatures.push(
                <Creature
                    key={nanoid()}
                    creature={creature}
                    quantity={quantity}
                    partyLevel={props.encounterDisplay.partyLevel}
                />
            )
        }
    }

    return (
        <section className="encounter-page">
            {notEmpty && <h2 className="encounter-page--current-display">
                PARTY LEVEL: {props.encounterDisplay.partyLevel} |
                PARTY SIZE: {props.encounterDisplay.partySize} |
                THREAT LEVEL: {props.encounterDisplay.threat.toUpperCase()} |
                XP BUDGET: {props.calculator.determineXPBudget(
                    props.encounterDisplay.partySize,
                    props.encounterDisplay.threat
                )}
            </h2>}
            <div className="encounter-page--display">
                {notEmpty && creatures}
            </div>
            <nav className="encounter-page--nav">
                <EncounterPageNavButton
                    className="encounter-page--first"
                    onClick={props.firstPage}
                    imgSrc={firstImg}
                    imgAlt="First"
                />
                <EncounterPageNavButton
                    className="encounter-page--prev"
                    onClick={props.prevPage}
                    imgSrc={backImg}
                    imgAlt="Back"
                />

                <span>
                    {
                        notEmpty ? props.encounterDisplay.page + 1 : 0
                    }/
                    {props.encounterDisplay.numPages}
                </span>

                <EncounterPageNavButton
                    className="encounter-page--next"
                    onClick={props.nextPage}
                    imgSrc={nextImg}
                    imgAlt="Next"
                />
                <EncounterPageNavButton
                    className="encounter-page--last"
                    onClick={props.lastPage}
                    imgSrc={lastImg}
                    imgAlt="Last"
                />
            </nav>
        </section>
    )
}

export default EncounterPage

