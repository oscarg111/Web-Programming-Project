// Home.js
import React, { useContext, useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode"
import Navbar from '../components/Navbar';

const HeroPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [heroData, setHeroData] = useState(null);

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
            console.log(data);
            setUserData(data);
            setHeroData({
              name: data.username,
              health: 50,
              maxHealth: 100,
              attack: 10,
              defense: 20,
            });
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  // let isLoggedIn = false;
  return heroData ? (
    <div className="hero-page">
      <Navbar />
      <div class="hero-pg-content">
        <h2>Welcome to the Hero Page</h2>
        <HeroCard hero={heroData} />
      </div>
    </div>
  ) : (
    <div className="hero-page">
      <Navbar />
      <div class="hero-pg-content">
        <h2>Log in to see your Hero</h2>
      </div>
    </div>
  );
};

export default HeroPage;
