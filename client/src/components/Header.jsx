import { Link } from "react-router-dom"

import logoImg from "../assets/favicon.png"

import "./Header.css"

/**
 * @returns {ReactComponentElement} The Header component,
 * provides the main brandin of the website and the navlinks
 * to view the different pages on the website
 */
function Header() {
    return (
        <header className="logo">
            <span className="logo--design">
                <img
                    className="logo--img"
                    src={logoImg}
                    alt="A logo of a red dragon head in a diamond frame"
                />
                <h1 className="logo--txt">Pathfinder Tools</h1>
            </span>
            <nav>
                <ul className="nav--links">
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`/encounter-calculator`}>Encounter Calculator</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header