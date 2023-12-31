// LoginPage.jsx
import { Link } from "react-router-dom"

import useLoginInput from "../hooks/useLoginInput.jsx"
import { useEffect } from "react";

import "./LoginPage.css"

/**
 * @param {Object} props An object consisting of 
 * -userReturning {bool} A bool indicating if the page should be for a
 *  login for returning users or register page for new users
 * @returns {ReactComponentElement} The Login/Register Page for the App
 */
function LoginPage(props){
    //hooks to handle login data, and update/authorize with the database
    const {
        loginInput,
        onInputChange,
        userReturning,
        setUserReturning,
        onLoginSubmit,
        loginErrorMessage
    } = useLoginInput();

    //changes pages based on if user is on the login or register URL
    //both pages are mostly the same but have minor variations so this way
    //of handling it is particularly efficient
    useEffect(()=>{
        setUserReturning(props.userReturning)
    },[props.userReturning])

    return (
        <form className = "login-form" onSubmit = {onLoginSubmit}>
            <div className = "login-form--top">
                <h2 className = "login-form--header">
                    {userReturning ? "Login":"Register"}
                </h2>
            </div>
            <div className = "login-form--content">
                <div className="login-form--inputs">
                    <span>
                        <label htmlFor="username">Username: </label>
                        <input
                            name = "username"
                            type = "text"
                            value = {loginInput.username}
                            onChange = {onInputChange}
                            required
                        />
                    </span>

                    <span>
                    <label htmlFor="password">Password: </label>
                        <input
                            name = "password"
                            type = "password"
                            value = {loginInput.password}
                            onChange = {onInputChange}
                            required
                        />
                    </span>

                    {
                        loginErrorMessage && 
                        <p className="login-form--error-message">
                            {loginErrorMessage}
                        </p>
                    }

                </div>
            </div>

            <Link to={`/${props.userReturning ? "register": "login"}`}>
                {
                    props.userReturning ? 
                    "Don't have an account? Register here." : 
                    "Already have an account? Login here."
                }
            </Link>

            <button className="submit-btn" type="submit">
                {props.userReturning ?"Login":"Register"}
            </button>
        </form>
    )
}

export default LoginPage