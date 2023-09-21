// useLoginInput.jsx
import { useState } from "react"
import "dotenv/config"

//pulls username from database to make sure it matches/is unique
const BASE_API_URL = process.env.SERVER_URL

function useLoginInput() {
    const [loginInput, setLoginInput] = useState(()=>({
        username: "",
        password: ""
    }))
    const [userReturning, setUserReturning] = useState(true)

    function onInputChange(event) {
        const { name, value } = event.target

        setLoginInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function onLoginSubmit(event){
        event.preventDefault()

        try {
            const res = await fetch(
                `${BASE_API_URL}/users/${userReturning ? "login" : "register"}`,
                {
                    method : "POST",
                    mode : "cors",
                    body: JSON.stringify(loginInput)
                }
            )
            console.log(res);
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