// LoginPage.jsx
import "./LoginPage.css"
import { Link } from "react-router-dom"


import useLoginInput from "../hooks/useLoginInput.jsx"
import { useEffect } from "react";

function LoginPage(props){
    const {
        loginInput,
        onInputChange,
        userReturning,
        setUserReturning,
        onLoginSubmit
    } = useLoginInput();

    useEffect(()=>{
        setUserReturning(props.userReturning)
    },[props.userReturning])
    return (
        <form className = "login-form" onSubmit = {onLoginSubmit}>
            <div className = "login-form--top">
                <h2 className = "login-form--header">
                    Login
                </h2>
            </div>
            <div className = "login-form--content">
                <div className="calc-form--inputs">
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
                </div>
            </div>

            <Link to={`/${props.userReturning ? "register": "login"}`}>
                {
                    props.userReturning ? 
                    "Don't Have an account? Register here." : 
                    "Already have an account? Login here."
                }
            </Link>

            <button
                type="submit"
            >
                {props.userReturning ?"Login":"Register"}
            </button>
        </form>
        

    )
}

export default LoginPage