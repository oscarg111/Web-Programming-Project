// Home.js
import React from "react";
import HeroCard from "../components/HeroCard";

const HeroPage = ({ isLoggedIn }) => {
  let hero = {
    name: "Jimmy",
    health: 50,
    maxHealth: 100,
    attack: 10,
    defense: 20,
  };
  // let isLoggedIn = false;
  return isLoggedIn ? (
    <div className="page">
      <div class="hero-pg-content">
        <h2>Welcome to the Hero Page</h2>
        <HeroCard hero={hero} />
      </div>
    </div>
  ) : (
    <div className="page">
      <div class="hero-pg-content">
        <h2>Log in to see your Hero</h2>
      </div>
    </div>
  );
};

export default HeroPage;
