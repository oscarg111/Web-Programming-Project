// Home.js
import React from "react";
import HeroCard from "../components/HeroCard";

const HeroPage = () => {
  return (
    <div className="page">
      <div class="hero-pg-content">
        <h2>Welcome to the Hero Page</h2>
        <HeroCard
          name={"Jimmy"}
          health={50}
          maxHealth={100}
          attack={10}
          defense={20}
        />
      </div>
    </div>
  );
};

export default HeroPage;
