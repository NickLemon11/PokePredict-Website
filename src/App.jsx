import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './HomePage';
import Play from './PlayPage';
import Guide from './GuidePage';
import Credits from "./CreditsPage";
import './App.css'

function App() {
  const location = useLocation();
  const currentPath = location.pathname; // get the current page

  return ( 
    <>
    <div className="menu">
      <Link to="/PokePredict/">
        <button className={`menu-button ${currentPath === "/PokePredict/" ? "active" : ""}`}>Home</button> 
      </Link>

        {currentPath === "PokePredict/" ? <Home/> : <> </>}

      <Link to="/PokePredict/play">
        <button className={`menu-button ${currentPath === "/PokePredict/play" ? "active" : ""}`}>Play</button>
      </Link>
      <div className="menu-logo"><b id="text-logo">Poké Predict</b></div>
      <Link to="/PokePredict/guide">
        <button className={`menu-button ${currentPath === "/PokePredict/guide" ? "active" : ""}`}>Guide</button>
      </Link>
      <Link to="/PokePredict/credits">
        <button className={`menu-button ${currentPath === "/PokePredict/credits" ? "active" : ""}`}>Credits</button>
      </Link>
    </div>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/PokePredict/" element={<Home />} />
        <Route path="/PokePredict/play" element={<Play />} />
        <Route path="/PokePredict/guide" element={<Guide />} />
        <Route path="/PokePredict/credits" element={<Credits /> } />
      </Routes>

    <footer></footer>
    </>
  )
}

export default App;
