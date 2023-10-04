// useLoginInput.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//pulls username from database to make sure it matches/is unique
const BASE_API_URL = import.meta.env.VITE_SERVER_URL

//Hook to manage the login/register page input
function useLoginInput() {
    const navigate = useNavigate()
    const [loginInput, setLoginInput] = useState(() => ({
        username: "",
        password: ""
    }))
    const [userReturning, setUserReturning] = useState(true)
    const [loginErrorMessage, setLoginErrorMessage] = useState("")


    useEffect(()=>{
        reset()
    },[userReturning])

    /**
     * Clears the login input and error messages when swapping between the login 
     * and register pages
     */
    function reset(){
        setLoginInput({
            username: "",
            password: ""
        })
        setLoginErrorMessage("")
    }
    /**
     * tracks the fields on the login/register page for submitting
     * @param {object} event Input change event object
     */
    function onInputChange(event) {
        const { name, value } = event.target

        setLoginInput(prev => ({
            ...prev,
            [name]: value
        }))
    }


    /**
     * accesses the database API on submit from login/register page,
     * using the tracked login data
     * @param {object} event Form submission object
     */
    async function onLoginSubmit(event){
        event.preventDefault()
        try {
            const res = await fetch(
                `${BASE_API_URL}/users/${userReturning ? "login" : "register"}`,
                {
                    headers: {
                        'Content-Type': 'application/json'},
                    method : "POST",
                    mode : "cors",
                    body: JSON.stringify(loginInput)
                }
            )
            const resData = await res.json()

            if(resData.status == 200){
                localStorage.setItem("accessToken",resData.accessToken)
                localStorage.setItem("username",resData.username)
                navigate("/")
            }else if(resData.status == 400){
                setLoginErrorMessage("Invalid username or password")
            }else if(resData.status == 500){
                setLoginErrorMessage("Username already taken")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        loginInput,
        onInputChange,
        userReturning,
        setUserReturning,
        onLoginSubmit,
        loginErrorMessage
    }
}

export default useLoginInput