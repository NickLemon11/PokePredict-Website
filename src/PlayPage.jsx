import React, { useState } from "react";
import { PokemonSelect } from "./PokemonSelect"
import "./play.css";

export default function Play() {
  const [viewer, setViewer] = useState("team");
  const [player, setPlayer] = useState("Your Team");
  const [prediction, setPrediction] = useState("Prediction");
  const [opponentMove, setOpponentMove] = useState("");
  const [activeTerrain, setActiveTerrain] = useState("none");
  const [activeWeather, setActiveWeather] = useState("none");
  const [playerStatus, setPlayerStatus] = useState("none");
  const [oppStatus, setOppStatus] = useState("none");

  const calculateMoves = () => {
    //send the stuff to rohith
  }

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
        <PokemonSelect player="user"/>
        <PokemonSelect player="user"/>
      </div>

      <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="user"/>
        <PokemonSelect player="user"/>
      </div>
        <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="user"/>
        <PokemonSelect player="user"/>
      </div>
    </div>

    <div className={player == "Opponent Team" ? "show" : "hide"}>
      <div className="pokemon-info">
        <PokemonSelect player="opponent"/>
        <PokemonSelect player="opponent"/>
      </div>

      <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="opponent"/>
        <PokemonSelect player="opponent"/>
      </div>

        <div className="pokemon-info" id="pok-spacer">
        <PokemonSelect player="opponent"/>
        <PokemonSelect player="opponent"/>
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
            <input className="input-move" id="input-look" placeholder="Look Ahead Turns # (1 - 6)"></input>
          </div>
          <button className="menu-button" id="calculate-button" onClick={() => {calculateMoves()}}>Calculate</button>
        </div>

        <div id="row" >
          <div className="row-status-user">
            <input className="input-move" id="input-active" placeholder="Your Active Pokemon"></input>

            <select className="statuses-player" onChange={(e) => { setPlayerStatus(e.target.value) }}>
              <option value="none">No Status</option>
              <option value="burn">Burned</option>
              <option value="para">Paralyzed</option>
              <option value="froz">Frozen</option>
              <option value="sleep">Asleep</option>
            </select>
          </div>
          <button className="menu-button" id="next-button" onClick={() => {opponentInput()}}>Continue</button>
        </div>

        <div id="row">
          <div className="row-status-opp">
            <input className="input-move" id="input-active-opp" placeholder="Opponent's Active Pokemon"></input>
            <select className="statuses-opp" onChange={(e) => { setOppStatus(e.target.value) }}>
              <option value="none">No Status</option>
              <option value="burn">Burned</option>
              <option value="para">Paralyzed</option>
              <option value="froz">Frozen</option>
              <option value="sleep">Asleep</option>
            </select>
          </div>
        </div>

        {/* terrain and weather buttons */}
        <div id="row-buttons">
          <button className="menu-button" id={activeTerrain == "none" ? "terrain-none-active" : "terrain-none"} onClick={() => {setActiveTerrain("none")}}>None</button>
          <button className="menu-button" id={activeTerrain == "elec" ? "terrain-electric-active" : "terrain-electric"} onClick={() => {setActiveTerrain("elec")}}>Electric</button>
          <button className="menu-button" id={activeTerrain == "gras" ? "terrain-grassy-active" : "terrain-grassy"} onClick={() => {setActiveTerrain("gras")}}>Grassy</button>
          <button className="menu-button" id={activeTerrain == "mist" ? "terrain-misty-active" : "terrain-misty"} onClick={() => {setActiveTerrain("mist")}}>Misty</button>
          <button className="menu-button" id={activeTerrain == "psych" ? "terrain-psychic-active" : "terrain-psychic"} onClick={() => {setActiveTerrain("psych")}}>Psychic</button>
          <h4 id="terrain-text">TERRAIN</h4>
        </div>

        <div id="row-buttons">
          <button className="menu-button" id={activeWeather == "none" ? "weather-none-active" : "weather-none"} onClick={() => {setActiveWeather("none")}}>None</button>
          <button className="menu-button" id={activeWeather == "sun" ? "weather-sun-active" : "weather-sun"} onClick={() => {setActiveWeather("sun")}}>Sunny</button>
          <button className="menu-button" id={activeWeather == "rain" ? "weather-rain-active" : "weather-rain"} onClick={() => {setActiveWeather("rain")}}>Rainy</button>
          <button className="menu-button" id={activeWeather == "snow" ? "weather-snow-active" : "weather-snow"} onClick={() => {setActiveWeather("snow")}}>Snowy</button>
          <button className="menu-button" id={activeWeather == "sand" ? "weather-sand-active" : "weather-sand"} onClick={() => {setActiveWeather("sand")}}>Sandy</button>
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
