import React, { useState } from "react";
import { MoveInput } from "./Dropdown";

export function PokemonSelect( {player} ) {
  const [inputName, setInputName] = useState('');
  const [img, setImg] = useState(null);
  const [type, setType] = useState(null);
  const [moves, setMoves] = useState([]);
  const [activeMoveIndex, setActiveMoveIndex] = useState(null);
  const [hp, setHp] = useState(100);
  const [attack, setAttack] = useState(100);
  const [defense, setDefense] = useState(100);
  const [specialAttack, setSpecialAttack] = useState(100);
  const [specialDefense, setSpecialDefense] = useState(100);
  const [speed, setSpeed] = useState(100);

  let increment = 3;

  const getPokemonImage = async (name) => { //fetch data from pokeapi based the passed in name from the user input
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!res.ok) throw new Error("Pokemon not found");

      const data = await res.json();
      setImg(data.sprites.other["dream_world"].front_default === null ? data.sprites.other["official-artwork"].front_default : data.sprites.other["dream_world"].front_default); //if no goofy artwork is found, use the default
      setType(data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(" & ")); //gets a map of the types in array, capitalizes the first letter and joins them with '&'
      setMoves(data.moves.map(m => m.move.name));
      setHp(data.stats.find(s => s.stat.name === "hp").base_stat);
      setAttack(data.stats.find(s => s.stat.name === "attack").base_stat);
      setDefense(data.stats.find(s => s.stat.name === "defense").base_stat);
      setSpecialAttack(data.stats.find(s => s.stat.name === "special-attack").base_stat);
      setSpecialDefense(data.stats.find(s => s.stat.name === "special-defense").base_stat);
      setSpeed(data.stats.find(s => s.stat.name === "speed").base_stat);
    } catch (err) {
      console.error(err);
    }
  };

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      getPokemonImage(inputName);
    }
  }

   console.log(player);
  return ( //pokemon card component
  < >
<div className="main-content" id="play-content">

  {/* LEFT SIDE - SEARCH ABOVE, MOVES BELOW */}
  <div className="left-side">
    <div className={`top-section ${player === "user" ? "blue" : "red"}`}>
      <input
        className="input-pokemon"
        placeholder="Pokemon Name"
        value={inputName}
        onChange={(event) => setInputName(event.target.value)}
        onKeyDown={onEnter}
      />
    </div>

    <div className="container-moves">
      {[0, 1, 2, 3].map(i => (
        <MoveInput
          key={i}
          index={i}
          allMoves={moves}
          activeIndex={activeMoveIndex}
          setActiveIndex={setActiveMoveIndex}
        />
      ))}
    </div>
  </div>

  {/* MIDDLE SIDE - TYPING + IMAGE */}
  <div className="middle-side"> 
     <input
      className="input-type"
      value={type}
      placeholder="Type"
      disabled
      readOnly
    />

    <div className="image-wrapper">
        <img src={img} className="image-pokemon" />
    </div>
  </div>

  {/* BOTTOM - STATS*/}
  <div className="stats-content">
     <div className="individual-stat" onClick={() => setHp(hp + increment)} onContextMenu={(e) => {e.preventDefault(); hp > 1 ? setHp(hp - increment) : null;}}><h5>Hp</h5> <h5 className="stat">{hp}</h5></div>
    <div className="individual-stat" onClick={() => setAttack(attack + increment)} onContextMenu={(e) => {e.preventDefault(); attack > 1 ? setAttack(attack - increment) : null;}}><h5>Atk</h5> <h5 className="stat">{attack}</h5></div>
    <div className="individual-stat" onClick={() => setDefense(defense + increment)} onContextMenu={(e) => {e.preventDefault(); defense > 1 ? setDefense(defense - increment) : null;}}><h5>Def</h5> <h5 className="stat">{defense}</h5></div>
    <div className="individual-stat" onClick={() => setSpecialAttack(specialAttack + increment)} onContextMenu={(e) => {e.preventDefault(); specialAttack > 1 ? setSpecialAttack(specialAttack - increment) : null;}}><h5>SpA</h5> <h5 className="stat">{specialAttack}</h5></div>
    <div className="individual-stat" onClick={() => setSpecialDefense(specialDefense + increment)} onContextMenu={(e) => {e.preventDefault(); specialDefense > 1 ? setSpecialDefense(specialDefense - increment) : null;}}><h5>SpD</h5> <h5 className="stat">{specialDefense}</h5></div>
    <div className="individual-stat" onClick={() => setSpeed(speed + increment)} onContextMenu={(e) => {e.preventDefault(); speed > 1 ? setSpeed(speed - increment) : null;}}><h5>Spe</h5> <h5 className="stat">{speed}</h5></div>
  </div>
</div>
  </>
  );
}