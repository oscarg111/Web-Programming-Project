// Home.js
import React, { useContext, useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./HeroPg.css";
import AddHero from "../components/AddHero";
import WorkoutStats from "../components/WorkoutStats";

const HeroPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [user, setUser] = useState({});
  const [addHeroOpen, setAddHeroOpen] = useState(false);
  const [viewWorkoutStats, setViewWorkoutStats] = useState(false);
  const [viewHeroes, setViewHeroes] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            console.log(data.userStats.lifetimePRs);
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

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const openAddHero = () => setAddHeroOpen(true);
  const closeAddHero = () => setAddHeroOpen(false);

  // let isLoggedIn = false;
  return heroes ? (
    <div className="hero-page">
      <Navbar />
      <div class="hero-pg-container">
        <div className="hero-card">
          <h2 className="page-title">
            Welcome to the Hero Page,{" "}
            {user.username ? user.username : "Loading..."}
          </h2>
          <div className="hero-container">
            <button
              className="hero-btns"
              onClick={() => {
                setViewHeroes(true);
                setViewWorkoutStats(false);
              }}
            >
              View Hero Stats
            </button>
            <button
              className="hero-btns"
              onClick={() => {
                setViewHeroes(false);
                setViewWorkoutStats(true);
              }}
            >
              View Workout Stats
            </button>
          </div>

          {viewHeroes &&
            heroes.map((hero) => <HeroCard hero={hero} key={hero._id} />)}

          {viewWorkoutStats && (
            <WorkoutStats
              workoutsCompleted={user.userStats.workoutsCompleted}
              totalVolume={user.userStats.totalVolume}
              lifetimePRs={user.userStats.lifetimePRs}
            />
          )}
          <button onClick={openAddHero}>Add Hero</button>
          {addHeroOpen && <AddHero onClose={closeAddHero} id_num={user._id} />}
          <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>
              LogOut
            </button>
          </div>
        </div>
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
