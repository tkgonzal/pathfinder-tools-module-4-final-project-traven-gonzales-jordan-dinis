import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import LandingPage from "./pages/LandingPage"
import EncounterCalculatorApp from "./pages/EncounterCalculatorApp"

import "./App.css"

/**
 * @returns {ReactComponentElement} The main app component,
 * contains the logic for the multi-page routing
 */
function App() {
  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/encounter-calculator" 
          element={<EncounterCalculatorApp />} 
        />
      </Routes>
    </div>
  )
}

export default App
