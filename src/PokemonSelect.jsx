import React, { useState } from "react";
import { MoveInput } from "./Dropdown";

export function PokemonSelect( {player, onAction} ) {
  const [inputName, setInputName] = useState('');
  const [img, setImg] = useState(null);
  const [type, setType] = useState([]);
  const [moves, setMoves] = useState([]);
  const [activeMoveIndex, setActiveMoveIndex] = useState(null);
  const [hp, setHp] = useState(100);
  const [attack, setAttack] = useState(100);
  const [defense, setDefense] = useState(100);
  const [specialAttack, setSpecialAttack] = useState(100);
  const [specialDefense, setSpecialDefense] = useState(100);
  const [speed, setSpeed] = useState(100);
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [ready, setReady] = useState("n");

  let increment = 5;

  const getPokemonDetails = async (name) => { //fetch data from pokeapi based the passed in name from the user input
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!res.ok) throw new Error("Pokemon not found");

      const data = await res.json();
      setImg(data.sprites.other["dream_world"].front_default === null ? data.sprites.other["official-artwork"].front_default : data.sprites.other["dream_world"].front_default); //if no goofy artwork is found, use the default
      setType(data.types.map(t => " " + t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1) + " ")); 
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

  const readyUp = () => {
    ready == "y" ? setReady("n") : setReady("y");
  }

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      getPokemonDetails(inputName);
    }   
  setMaxHp((2 * hp) + 204);
  console.log("HP: " + hp, "MAX HP: " + maxHp)
  }

  return ( //pokemon card component
  < >
<div className="main-content" id={ready == "n" ? "play-content" : "play-content-ready"}>

  {/* LEFT SIDE - SEARCH ABOVE, MOVES BELOW */}
  <div className="left-side">
    <div className={`top-section ${player === "user" ? "blue" : "red"}`}>
      <input disabled={ready === "y"} className="input-pokemon" placeholder="Pokemon Name" value={inputName} onChange={(event) => setInputName(event.target.value)} onKeyDown={onEnter}/>
    </div>

    <div className="container-moves">
      <MoveInput locked={ready === "y"} index={0} value={selectedMoves[0] || ""} allMoves={moves} activeIndex={activeMoveIndex} setActiveIndex={setActiveMoveIndex} onSelect={(move) => ready === "n" && setSelectedMoves(prevState => [...prevState, move])}/>
      <MoveInput locked={ready === "y"} index={1} allMoves={moves} activeIndex={activeMoveIndex} setActiveIndex={setActiveMoveIndex} onSelect={(move) => setSelectedMoves(prevState => [...prevState, move])}/>
      <MoveInput locked={ready === "y"} index={2} allMoves={moves} activeIndex={activeMoveIndex} setActiveIndex={setActiveMoveIndex} onSelect={(move) => setSelectedMoves(prevState => [...prevState, move])}/>
      <MoveInput locked={ready === "y"} index={3} allMoves={moves} activeIndex={activeMoveIndex} setActiveIndex={setActiveMoveIndex} onSelect={(move) => setSelectedMoves(prevState => [...prevState, move])}/>
    </div>
  </div>

  {/* MIDDLE SIDE - TYPING + IMAGE */}
  <div className="middle-side"> 
    <input className="input-type" value={type} placeholder="Type" disabled readOnly/>

    <div className="image-wrapper">
        <img src={img} className="image-pokemon" />
    </div>
    <button
  className="menu-button"
  id="ready"
  onClick={() => {if (ready === "n")
    {onAction({
      name: inputName,
      hp: hp,
      maxhp: hp,
      attack: attack,
      spattack: specialAttack,
      defense: defense,
      spdefense: specialDefense,
      maxspeed: speed,
      type1: type[0].trim(),
      type2: type.length > 1 ? type[1].trim() : null,
      moves: selectedMoves,
    }); readyUp();}}
  }>
</button>

  </div>

  {/* BOTTOM - STATS*/}
  <div className="stats-content">
    <div className="individual-stat" onClick={() => ready === "n" && setHp(hp + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && hp > 1 && setHp(hp - increment);}}><h5>Hp</h5> <h5 className="stat">{hp}</h5></div>
    <div className="individual-stat" onClick={() => ready === "n" && setAttack(attack + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && attack > 1 && setAttack(attack - increment);}}><h5>Atk</h5> <h5 className="stat">{attack}</h5></div>
    <div className="individual-stat" onClick={() => ready === "n" && setDefense(defense + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && defense > 1 && setDefense(defense - increment);}}><h5>Def</h5> <h5 className="stat">{defense}</h5></div>
    <div className="individual-stat" onClick={() => ready === "n" && setSpecialAttack(specialAttack + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && specialAttack > 1 && setSpecialAttack(specialAttack - increment);}}><h5>SpA</h5> <h5 className="stat">{specialAttack}</h5></div>
    <div className="individual-stat" onClick={() => ready === "n" && setSpecialDefense(specialDefense + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && specialDefense > 1 && setSpecialDefense(specialDefense - increment);}}><h5>SpD</h5> <h5 className="stat">{specialDefense}</h5></div>
    <div className="individual-stat" onClick={() => ready === "n" && setSpeed(speed + increment)} onContextMenu={(e) => {e.preventDefault(); ready === "n" && speed > 1 && setSpeed(speed - increment);}}><h5>Spe</h5> <h5 className="stat">{speed}</h5></div>
  </div>
  </div>
  </>
  );
}