import React from "react";
import instagram from "./assets/Instagram.webp";
import linkedIn from "./assets/LinkedIn.webp";
import github from "./assets/gitlogo.png";
import "./credits.css";

export default function Credits() {
    return (
    <>
    <div className="main-content" id="credits">CREDITS</div>
    <div className="socials"> 
          <a target="_blank" href="https://www.instagram.com/nikola._.dimitrov/"><img className="logo-app" src={instagram} width="30"/></a>
          <a target="_blank" href="https://www.linkedin.com/in/nikola-dimitrov-907a30368/"><img className="logo-app" src={linkedIn} width="30"/></a>
          <a target="_blank" href="https://github.com/NickLemon11"><img className="logo-app" src={github} width="30"/></a>
        </div>
    </>
    );
}