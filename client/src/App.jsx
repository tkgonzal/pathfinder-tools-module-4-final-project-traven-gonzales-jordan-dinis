import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import LandingPage from "./pages/LandingPage"
import EncounterCalculatorApp from "./pages/EncounterCalculatorApp"
import LoginPage from "./pages/LoginPage"

import useAccess from "./hooks/useAccess"

import "./App.css"

/**
 * @returns {ReactComponentElement} The main app component,
 * contains the logic for the multi-page routing
 */
function App() {
  const {loggedIn, logout} = useAccess()

  return (
    <div className="main">
      <Header loggedIn = {loggedIn} logout = {logout}/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/encounter-calculator" 
          element={<EncounterCalculatorApp />} 
        />
        <Route 
          path="/login"
          element={
          <LoginPage
            userReturning = {true}
          />}
        />
        <Route 
          path="/register"
          element={
          <LoginPage
            userReturning = {false}
          />}
        />
      </Routes>
    </div>
  )
}

export default App
