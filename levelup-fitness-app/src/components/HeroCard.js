import React, { useState, useEffect } from "react";

const HeroCard = ({ name, health, maxHealth, attack, defense }) => {
  const [displayedHealth, setDisplayedHealth] = useState(0); // use state for displayed health
  const [displayedAttack, setDisplayedAttack] = useState(0); // use state for displayed attack
  const [displayedDefense, setDisplayedDefense] = useState(0); // use state for displayed defense

  const healthPercentage = (health / maxHealth) * 100;

  // use effect for health
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedHealth(healthPercentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [healthPercentage]);

  // use effect for attack
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedAttack(attack);
    }, 100);
    return () => clearTimeout(timeout);
  }, [attack]);

  // use effect for defense
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedDefense(defense);
    }, 100);
    return () => clearTimeout(timeout);
  }, [defense]);

  return (
    <div class="hero-stats-card">
      <h2>{name}</h2>

      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{ width: `${displayedHealth}%`, backgroundColor: `#3bde5a` }}
        ></div>
      </div>
      <p>
        Health: {health} / {maxHealth}
      </p>
      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{ width: `${displayedAttack}%`, backgroundColor: `#f72323` }}
        ></div>
      </div>
      <p>Attack: {attack}</p>
      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{
            width: `${displayedDefense}%`,
            backgroundColor: `#2353d4`,
          }}
        ></div>
      </div>
      <p>defense: {defense}</p>
    </div>
  );
};

export default HeroCard;
