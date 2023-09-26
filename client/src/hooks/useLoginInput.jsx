// useLoginInput.jsx
import { useState } from "react"

//pulls username from database to make sure it matches/is unique
const BASE_API_URL = import.meta.env.VITE_SERVER_URL

//Hook to manage the login/register page input
function useLoginInput() {
    const [loginInput, setLoginInput] = useState(() => ({
        username: "",
        password: ""
    }))
    const [userReturning, setUserReturning] = useState(true)

    
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
            console.log(resData)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        loginInput,
        onInputChange,
        userReturning,
        setUserReturning,
        onLoginSubmit
    }
}

export default useLoginInput