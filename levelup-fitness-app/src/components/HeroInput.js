import React from "react";
import samurai_image from "../assets/samurai.png";


const HeroInput = ({ heroName, onAddHero }) => {
  return (
    <div>
      <h1>Hero: {heroName}</h1>
      <br></br>
      <img src={' '} />
      <hr />
      <button id={heroName} onClick={onAddHero}>
        Add {heroName}
      </button>
    </div>
  );
};

export default HeroInput;
