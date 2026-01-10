import React, { useState } from "react";
import { PokemonSelect } from "./PokemonSelect";
import "./play.css";

export default function Play() {
  const [viewer, setViewer] = useState("team");
  const [player, setPlayer] = useState("Your Team");
  const [userActive, setUserActive] = useState("");
  const [oppActive, setOppActive] = useState("");
  const [lookTurns, setLookTurns] = useState(0);
  const [prediction, setPrediction] = useState("...");
  const [opponentSwitchPok, setOpponentSwitchPok] = useState("");
  const [opponentMove, setOpponentMove] = useState("");
  const [activeTerrain, setActiveTerrain] = useState("None");
  const [activeWeather, setActiveWeather] = useState("None");
  const [playerStatus, setPlayerStatus] = useState("None");
  const [oppStatus, setOppStatus] = useState("No Status");
  const [userTeam, setUserTeam] = useState([]);
  const [oppTeam, setOppTeam] = useState([]);

  const sendTeam = () => {
    let valid = "";
    if (lookTurns > 0) {
      valid = "Valid";
    } else {
      valid = "Rejected";
    }
    console.log("Sending the following battle data to the backend...");
    console.log("Look Ahead Turns:", lookTurns + ", " + valid);
    console.log("Your Active Pokémon:", userActive + ", Status: " + playerStatus);
    console.log("Opponent's Active Pokémon:", oppActive + ", Status: " + oppStatus);
    console.log("Terrain:", activeTerrain);
    console.log("Weather:", activeWeather);


    console.log("------USER TEAM-------");
    for (let i = 0; i < userTeam.length; i++) {
      console.log(userTeam[i]);
    }
    
    console.log("------OPPONENT TEAM-------");
    for (let i = 0; i < oppTeam.length; i++) {
      console.log(oppTeam[i]);
    }

  };

  const handleUserTeamChange = (value) => {
    setUserTeam(prev => {
      if (prev.some(p => p.name === value.name)) {
        return prev; // already exists, ignore
      }
      return [...prev, value];
    });
    
  };

  const handleOppTeamChange = (value) => {
    setOppTeam(prev => {
      if (prev.some(p => p.name === value.name)) {
        return prev; // already exists, ignore
      }
      return [...prev, value];
    });
  };

  const opponentInput = () => {
    if ((prompt("Did the opponent switch Pokémon?").toLowerCase().charAt(0)) === "n") {
      setOpponentMove(prompt("What move did their " + oppActive + " do?").toLowerCase());
    } else {
      setOpponentSwitchPok(prompt("What Pokémon did they switch into from " + oppTeam[0].name + "?        If it is a new Pokémon, please input it in the team viewer.").toLowerCase());
    }
  };

  return (
    <>
      {/* ================= TOP BUTTONS ================= */}
      <div className="top-buttons">
        <button className="menu-button" id="page-viewer"
          onClick={() =>
            setViewer(viewer === "team" ? "other" : "team")
          }>
          Switch View
        </button>

        {viewer === "team" && (
          <button className="menu-button" id={player === "Your Team" ? "player-viewer" : "opponent-viewer"}
            onClick={() =>
              setPlayer(player === "Your Team" ? "Opponent Team" : "Your Team")
            }
          >
            Switch Team
          </button>
        )}
      </div>
    <div className={viewer === "team" ? "pokemon-select-container" : ""}>
      {/*  TEAM VIEW (stays rendered but in the background so states are not lost) */}
      <div className={viewer === "team" ? "show" : "hide"}>
        <div className={player === "Your Team" ? "show" : "hide"}>
          <div className="pokemon-info">
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
          </div>
          <div className="pokemon-info" id="pok-spacer">
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
          </div>
          <div className="pokemon-info" id="pok-spacer">
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
            <PokemonSelect player="user" onAction={handleUserTeamChange} />
          </div>
        </div>

        <div className={player === "Opponent Team" ? "show" : "hide"}>
          <div className="pokemon-info">
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
          </div>
          <div className="pokemon-info" id="pok-spacer">
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
          </div>
          <div className="pokemon-info" id="pok-spacer">
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
            <PokemonSelect player="opponent" onAction={handleOppTeamChange} />
          </div>   
        </div>
      </div>
    </div>
      {/* PREDICTION VIEW (ORIGINAL LAYOUT) */}
      <div className={viewer === "other" ? "show" : "hide"}>
        <div className="prediction-content">
          <div id="col">
            <div id="row">
              <div id="accent-look">
                <input className="input-move" id="input-look" placeholder="Look Ahead Turns # (1 - 6)" onChange={(e) => e.target.value <= 0 || e.target.value > 6 ? setLookTurns(0) : setLookTurns(e.target.value)}/>
              </div>
              <button className="menu-button" id="calculate-button" onClick={sendTeam}>
                Calculate
              </button>
            </div>

            <div id="row">
              <div className="row-status-user">
                <select className="input-move"  id="input-active" value={userActive} onChange={e => setUserActive(e.target.value)}>
                  <option value="">Select Active Pokémon</option>
                  {userTeam.map((p, i) => (
                    <option key={i} value={p.name}>{p.name}</option>
                  ))}
                </select>

                <select className="statuses-player" onChange={e => setPlayerStatus(e.target.value)}>
                  <option>No Status</option>
                  <option>Burned</option>
                  <option>Paralyzed</option>
                  <option>Frozen</option>
                  <option>Poison</option>
                  <option>Toxic</option>
                  <option>Sleep</option>
                </select>
              </div>

              <button className="menu-button" id="next-button" onClick={opponentInput}>
                Continue
              </button>
            </div>

            <div id="row">
              <div className="row-status-opp">
                <select className="input-move" id="input-active-opp" value={oppActive} onChange={e => setOppActive(e.target.value)}>
                  <option value="">Select Opponent Pokémon</option>
                  {oppTeam.map((p, i) => (
                    <option key={i} value={p.name}>{p.name}</option>
                  ))}
                </select>

                <select className="statuses-opp" onChange={e => setOppStatus(e.target.value)}>
                  <option>No Status</option>
                  <option>Burn</option>
                  <option>Paralyzed</option>
                  <option>Frozen</option>
                  <option>Poison</option>
                  <option>Toxic</option>
                  <option>Sleep</option>
                </select>
              </div>
            </div>

            {/* terrain and weather buttons */} 
            <div id="row-buttons"> 
              <button className="menu-button" id={activeTerrain == "None" ? "terrain-none-active" : "terrain-none"} onClick={() => {setActiveTerrain("None")}}>None</button> 
              <button className="menu-button" id={activeTerrain == "Electric" ? "terrain-electric-active" : "terrain-electric"} onClick={() => {setActiveTerrain("Electric")}}>Electric</button> 
              <button className="menu-button" id={activeTerrain == "Grassy" ? "terrain-grassy-active" : "terrain-grassy"} onClick={() => {setActiveTerrain("Grassy")}}>Grassy</button> 
              <button className="menu-button" id={activeTerrain == "Misty" ? "terrain-misty-active" : "terrain-misty"} onClick={() => {setActiveTerrain("Misty")}}>Misty</button> 
              <button className="menu-button" id={activeTerrain == "Psychic" ? "terrain-psychic-active" : "terrain-psychic"} onClick={() => {setActiveTerrain("Psychic")}}>Psychic</button> <h4 id="terrain-text">TERRAIN</h4> 
            </div> 
            <div id="row-buttons"> 
              <button className="menu-button" id={activeWeather == "None" ? "weather-none-active" : "weather-none"} onClick={() => {setActiveWeather("None")}}>None</button> 
              <button className="menu-button" id={activeWeather == "Sun" ? "weather-sun-active" : "weather-sun"} onClick={() => {setActiveWeather("Sun")}}>Sunny</button> 
              <button className="menu-button" id={activeWeather == "Rain" ? "weather-rain-active" : "weather-rain"} onClick={() => {setActiveWeather("Rain")}}>Rainy</button> 
              <button className="menu-button" id={activeWeather == "Snow" ? "weather-snow-active" : "weather-snow"} onClick={() => {setActiveWeather("Snow")}}>Snowy</button> 
              <button className="menu-button" id={activeWeather == "Sand" ? "weather-sand-active" : "weather-sand"} onClick={() => {setActiveWeather("Sand")}}>Sandy</button>
              <h4 id="weather-text">WEATHER</h4> 
            </div>
            <div className="prediction">{prediction}</div>
          </div>
        </div>
      </div>

      <div className="bottom-content"></div>
    </>
  );
}
