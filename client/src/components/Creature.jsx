// Creature.jsx
import "./Creature.css"

import lowThreatIcon from "../assets/low-threat.png"
import midThreatIcon from "../assets/mid-threat.png"
import highThreatIcon from "../assets/high-threat.png"

// The component that displays the individual creature information
// for each encounter
function Creature(props) {
    let creatureIcon;
    const creatureMod = props.creature.level - props.partyLevel
    if (creatureMod < -1) {
        creatureIcon = lowThreatIcon
    } else if (creatureMod < 2) {
        creatureIcon = midThreatIcon
    } else {
        creatureIcon = highThreatIcon
    }

    return (
        <section className="creature">
            <span className="creature--id">
                <img
                    src={creatureIcon}
                    alt="creature icon" />
                {props.quantity}x
                Creature LV: {props.creature.level}
            </span>

            <span className="creature--data">
                <span className="creature--xp">
                    XP: {props.creature.xp}
                </span>
                <a
                    href={`https://2e.aonprd.com/Creatures.aspx?values-from=level%3A${props.creature.level}&values-to=level%3A${props.creature.level}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Creatures
                </a>
            </span>
        </section>
    )
}

export default Creature

