// EncounterPageNavButton.jsx
/**
 * @param {Object} props An object consisting of a classname
 * for the button, an onClick for the button, a srcImg for
 * the button, and an alt for the button's image
 * @returns {ReactElement} A nav button for use on 
 * the EncounterPage
 */
function EncounterPageNavButton(props) {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            <img
                src={props.imgSrc}
                alt={props.imgAlt}
            />
        </button>
    )
}

export default EncounterPageNavButton