import React from "react";
import "./guide.css";
import guideImage1 from "./assets/guideImage1.png";
import guideImage2 from "./assets/guideImage2.png";
import guideImage3 from "./assets/guideImage3.png";
import guideImage4 from "./assets/guideImage4.png";

export default function Guide() {
    return (
    <>
    <div className="main-content" id="guide">1. Enter the details of each Pokémon into team viewer including your opponent's pokemon and move's of which you know. All Pokémon data is sourced officially from PokeAPI. Should you experience trouble with entering a specific name, ensure it is the official spelling of said Pokémon.<br/> 
                                            <img className="guideImage" src={guideImage1}></img>   <br />
                                             2. Use your mouse to left click on a stat to increase and right click to decrease. Adjust the stats so the match the stats of the Pokémon in your battle as closely as possible. <br/>
                                            <img className="guideImage" src={guideImage2}></img>   <br />
                                             3. Using the upper menu, switch view and enter the number of turns you want us to predict. PokéPredict will simulate those look ahead turns and determine your optimal plays to help you win. Also input the active Pokémon and their status condition. <br/>
                                            <img className="guideImage" src={guideImage3}></img>   <br />
                                             4. Lastly, input the terrain and weather conditions. Your now ready to run the simulation! Click 'calculate', to proceed to the next turn click 'next'. You will then be asked what the opponent did, if there was a switch simply input 'switch'.
                                            <img className="guideImage" src={guideImage4}></img>   <br />
    </div>
    </>             
    );
}