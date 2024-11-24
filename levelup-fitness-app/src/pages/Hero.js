// Home.js
import React, { useContext, useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./HeroPg.css";
import AddHero from "../components/AddHero";

const HeroPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [user, setUser] = useState(null);
  const [addHeroOpen, setAddHeroOpen] = useState(false);

  // get user/hero data
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // fetch UID from mongoDB with api call
        fetch(`${process.env.REACT_APP_API_URL}/auth/user?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("getting user");
            console.log(data);
            setHeroes(data.heroes);
            console.log(heroes);
            setUser(data);
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const openAddHero = () => setAddHeroOpen(true);
  const closeAddHero = () => setAddHeroOpen(false);

  // let isLoggedIn = false;
  return heroes ? (
    <div className="hero-page">
      <Navbar />
      <div class="hero-pg-content">
        <h2>Welcome to the Hero Page</h2>
        {heroes.map((hero) => (
          <HeroCard hero={hero} key={hero._id} />
        ))}
        <button onClick={openAddHero}>Add Hero</button>
        {addHeroOpen && <AddHero onClose={closeAddHero} id_num={user._id} />}
      </div>
    </div>
  ) : (
    <div className="hero-page">
      <Navbar />
      <div class="hero-pg-content">
        <h2>Add a hero</h2>
        <button onClick={openAddHero}>Add Hero</button>
        {addHeroOpen && <AddHero onClose={closeAddHero} id_num={user._id} />}
      </div>
    </div>
  );
};

export default HeroPage;
