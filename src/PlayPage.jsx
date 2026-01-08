import React, { useState } from "react";
import { PokemonSelect } from "./PokemonSelect"
import "./play.css";

export default function Play() {
  const [viewer, setViewer] = useState("team");
  const [player, setPlayer] = useState("Your Team");
  const [userActive, setUserActive] = useState("");
  const [oppActive, setOppActive] = useState("");
  const [lookTurns, setLookTurns] = useState(0);
  const [prediction, setPrediction] = useState("...");
  const [opponentMove, setOpponentMove] = useState("");
  const [activeTerrain, setActiveTerrain] = useState("none");
  const [activeWeather, setActiveWeather] = useState("none");
  const [playerStatus, setPlayerStatus] = useState("none");
  const [oppStatus, setOppStatus] = useState("none");
  const [userTeam, setUserTeam] = useState([]);
  const [oppTeam, setOppTeam] = useState([]);


  const sendTeam = () => {
    //send the whole team
    console.log("LOOK AHEAD TURNS: " + lookTurns);
    console.log("YOUR ACTIVE POKEMON: " + userActive + ", CONDITION: " + playerStatus);
    console.log("OPPONENTS ACTIVE POKEMON: " + oppActive + ", CONDITION: " + oppStatus);
    console.log("TERRAIN: " + activeTerrain);
    console.log("WEATHER: " + activeWeather);
  }

  const handleUserTeamChange = (value) => {
    console.log("USER TEAM:");
    setUserTeam(prev => [...prev, value]);
    for (let i = 0; i < userTeam.length; i++) {
      console.log(userTeam[i]);
    }
  };

  const handleOppTeamChange = (value) => {
    console.log("OPPONENT TEAM:");
    setOppTeam(prev => [...prev, value]);
    for (let i = 0; i < oppTeam.length; i++) {
      console.log(oppTeam[i]);
    }
  };

  const opponentInput = () => {
    setOpponentMove(prompt("What did the opponent do?"));
  }

  return (
    <>
    {viewer == "team" ? 
    <>
    <div className="top-buttons">
      <button className="menu-button" id="page-viewer" onClick={() => {viewer == "team" ? setViewer("other") : setViewer("team")}}>Switch View</button>
      <button className="menu-button" id={player == "Your Team" ? "player-viewer" : "opponent-viewer"} onClick={() => {player == "Your Team" ? setPlayer("Opponent Team") : setPlayer("Your Team")}}>Switch Team</button>
    </div>
    <div className={player == "Your Team" ? "show" : "hide"}>
      <div className="pokemon-info">
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
      </div>

      <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
      </div>
        <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
        <PokemonSelect player="user" onAction={handleUserTeamChange}/>
      </div>
    </div>

    <div className={player == "Opponent Team" ? "show" : "hide"}>
      <div className="pokemon-info">
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
      </div>

      <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
      </div>

      <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
        <PokemonSelect player="opponent" onAction={handleOppTeamChange}/>
      </div>
    </div> </> : 
      <>
    <div className="top-buttons">
      <button className="menu-button" id="page-viewer" onClick={() => {viewer == "team" ? setViewer("other") : setViewer("team")}}> Switch View</button>
    </div>

    <div className="prediction-content">
      <div id="col">
        <div id="row">
          <div id="accent-look">
            <input className="input-move" id="input-look" placeholder="Look Ahead Turns # (1 - 6)"  onChange={(event) => event.target.value <= 0 || event.target.value > 6 ? setLookTurns(0) : setLookTurns(event.target.value)}></input>
          </div>
          <button className="menu-button" id="calculate-button" onClick={() => {sendTeam()}}>Calculate</button>
        </div>

        <div id="row" >
          <div className="row-status-user">
            <select className="input-move" id="input-active" value={userActive} onChange={(e) => setUserActive(e.target.value)}>
            <option value="">Select Active Pokémon</option>
              {userTeam.map((poke, i) => (
                <option key={i} value={poke.name}>
                  {poke.name}
                </option>
              ))}
            </select>

            <select className="statuses-player" onChange={(e) => { setPlayerStatus(e.target.value) }}>
              <option value="None">No Status</option>
              <option value="Burn">Burned</option>
              <option value="Paralyzed">Paralyzed</option>
              <option value="Frozen">Frozen</option>
              <option value="Poison">Poisoned</option>
              <option value="Badly Poisoned">Toxic</option>
              <option value="Sleep">Asleep</option>
            </select>
          </div>
          <button className="menu-button" id="next-button" onClick={() => {opponentInput()}}>Continue</button>
        </div>

        <div id="row">
          <div className="row-status-opp">        
          <select className="input-move" id="input-active-opp" value={oppActive} onChange={(e) => setOppActive(e.target.value)}>
            <option value="">Select Opponent Pokémon</option>
            {oppTeam.map((poke, i) => (
              <option key={i} value={poke.name}>
                {poke.name}
              </option>
            ))}
          </select>

            <select className="statuses-opp" onChange={(e) => { setOppStatus(e.target.value) }}>
              <option value="None">No Status</option>
              <option value="Burn">Burned</option>
              <option value="Paralyzed">Paralyzed</option>
              <option value="Frozen">Frozen</option>
              <option value="Poison">Poisoned</option>
              <option value="Badly Poisoned">Toxic</option>
              <option value="Sleep">Asleep</option>
            </select>
          </div>
        </div>

        {/* terrain and weather buttons */}
        <div id="row-buttons">
          <button className="menu-button" id={activeTerrain == "None" ? "terrain-none-active" : "terrain-none"} onClick={() => {setActiveTerrain("None")}}>None</button>
          <button className="menu-button" id={activeTerrain == "Electric" ? "terrain-electric-active" : "terrain-electric"} onClick={() => {setActiveTerrain("Electric")}}>Electric</button>
          <button className="menu-button" id={activeTerrain == "Grassy" ? "terrain-grassy-active" : "terrain-grassy"} onClick={() => {setActiveTerrain("Grassy")}}>Grassy</button>
          <button className="menu-button" id={activeTerrain == "Misty" ? "terrain-misty-active" : "terrain-misty"} onClick={() => {setActiveTerrain("Misty")}}>Misty</button>
          <button className="menu-button" id={activeTerrain == "Psychic" ? "terrain-psychic-active" : "terrain-psychic"} onClick={() => {setActiveTerrain("Psychic")}}>Psychic</button>
          <h4 id="terrain-text">TERRAIN</h4>
        </div>

        <div id="row-buttons">
          <button  className="menu-button" id={activeWeather == "None" ? "weather-none-active" : "weather-none"} onClick={() => {setActiveWeather("None")}}>None</button>
          <button className="menu-button" id={activeWeather == "Sun" ? "weather-sun-active" : "weather-sun"} onClick={() => {setActiveWeather("Sun")}}>Sunny</button>
          <button className="menu-button" id={activeWeather == "Rain" ? "weather-rain-active" : "weather-rain"} onClick={() => {setActiveWeather("Rain")}}>Rainy</button>
          <button className="menu-button" id={activeWeather == "Snow" ? "weather-snow-active" : "weather-snow"} onClick={() => {setActiveWeather("Snow")}}>Snowy</button>
          <button className="menu-button" id={activeWeather == "Sand" ? "weather-sand-active" : "weather-sand"} onClick={() => {setActiveWeather("Sand")}}>Sandy</button>
          <h4 id="weather-text">WEATHER</h4>
        </div>

        <div className="prediction">{prediction}</div>
      </div>
    </div>
  </>
  }
      <div className="bottom-content"></div>
    </>
  ); 
}
