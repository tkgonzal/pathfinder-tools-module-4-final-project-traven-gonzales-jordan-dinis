// LoginPage.jsx
import "./LoginPage.css"
import { Link } from "react-router-dom"

function LoginPage(props){
    return (
        <form className = "login-form" onSubmit = {props}>
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
                            required
                        />
                    </span>

                    <span>
                    <label htmlFor="password">Password: </label>
                        <input
                            name = "password"
                            type = "password"
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