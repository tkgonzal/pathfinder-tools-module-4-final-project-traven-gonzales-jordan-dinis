import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function useAccess(){
    const [loggedIn, setLoggedIn] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        setLoggedIn(localStorage.getItem("accessToken") ? true: false)
    },[location])

    function logout(){
        localStorage.removeItem("username")
        localStorage.removeItem("accessToken")
        navigate("/")
    }

    return {
        loggedIn,
        logout
    }
}

export default useAccess