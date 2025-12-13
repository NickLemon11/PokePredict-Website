import React from "react";
import {Link} from 'react-router-dom';
import "./home.css";
import { useState, useEffect} from 'react'
import homebanner1 from "./assets/home_banner.webp";
import homebanner2 from "./assets/home_banner2.webp";

export default function Home() {
  const banners = [homebanner1, homebanner2];
  const [banner, setBanner] = useState(banners[0]);
  const [color, setColor] = useState("blue");

  useEffect(() => { //switch banner image every # seconds
    const interval = setInterval(() => {
      setBanner(prev => (prev === banners[0] ? banners[1] : banners[0]));
      if (color == "blue") {
         setColor("purple");
      } else {
        setColor("blue");
      }     
    }, 4000); 

    return () => clearInterval(interval); //cleanup on unmount
  })

    return (
    <>
        <div className={`main-content ${color === "blue" ? "blue" : "purple"}`}>
          <div className="banner-container">
            <img id="banner1" className = {`banner ${banner === banners[0] ? "active" : "hidden"}`} src={homebanner1}></img>
            <img id="banner2" className = {`banner ${banner === banners[1] ? "active" : "hidden"}`} src={homebanner2}></img>
          </div>
            <div className="home-text">
                <h1 className="game-title">Battle Predictor</h1>
                <p className= "text-game">Poké Predict aids you during Pokémon battles by predicting the optimal move to take. This program takes into account all the variables present in a match of Pokémon, from STAB moves to terrain conditions. Outpredict your opponents with our tool and learn how to play like a pro. We recommend using our tool with the online battle simulator <u><a target="_blank" href="https://play.pokemonshowdown.com/">Pokemon Showdown</a></u>.</p>
                <Link to="/PokePredict/play">
                  <button className="menu-button" id="launch">LAUNCH</button>
                </Link>  
            </div>      
        </div>
    </>
    );
}