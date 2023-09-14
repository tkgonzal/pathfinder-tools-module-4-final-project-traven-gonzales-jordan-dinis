// InfoBar.jsx
import "./InfoBar.css"

// Info Bar for the App, explaining what it does and referring the user
// to the full rules of Encounter Building for PF2e
function InfoBar() {
    return (
        <section className="info">
            <h2 className="info--header">About</h2>
            <hr />
            <p className="info--description">
                This is an Encounter Calculator for the game Pathfinder 2nd Edition.
                Please select your desired <span className="info--key-term">Party Level</span>
                , <span className="info--key-term">Party Size</span>
                , and <span className="info--key-term">Threat Level</span>, and this
                app will calculate all possible variations of encounters.
            </p>

            <p className="info--description">
                Each creature has a "View Creatures" link that will
                redirect to a page on Archive of Nethys with all creatures of that level.
                Full rules for Encounter Building can be <a
                    href="https://2e.aonprd.com/Rules.aspx?ID=497"
                    className="info--encounter-rules"
                    target="_blank"
                >
                    viewed here
                </a>.
            </p>
        </section>
    )
}

export default InfoBar

