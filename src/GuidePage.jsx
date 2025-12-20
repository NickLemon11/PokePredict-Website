import React from "react";
import "./guide.css";

export default function Guide() {
    return (
    <>
    <div className="main-content" id="guide">1. Enter each of your pokemon into team viewer and enter the pokemons and moves of the opponent that you know. <br/> 
                                             2. Left click on a stat to increase it and adjust it so each Pokemon matches the stats in the battle. <br/>
                                             3. Switch view and enter the number of turns you want PokePredict to predict, along with the active Pokemon and its status condition. <br/>
                                             4. Enter the terrain and weather conditions, then click 'calculate', to proceed to next turn click 'next'.
                                             </div>
    </>             
    );
}