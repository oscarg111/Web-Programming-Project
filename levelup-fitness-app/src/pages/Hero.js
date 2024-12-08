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
  const [user, setUser] = useState(null);
  const [addHeroOpen, setAddHeroOpen] = useState(false);
  const [viewWorkoutStats, setViewWorkoutStats] = useState(false);
  const [viewHeroes, setViewHeroes] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 500) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setHeroes(data.heroes);
        console.log(user);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const openAddHero = () => setAddHeroOpen(true);
  const closeAddHero = () => setAddHeroOpen(false);

  // let isLoggedIn = false;
  return user ? (
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
      <div class="hero-pg-container">
        <h2>Login to see heroes</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default HeroPage;
