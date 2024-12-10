// Navbar.js
import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link for navigation
import "./navbar.css";
import "./LandingNav.css";
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";
import home_icon from "../assets/home.png";
import hero_icon from "../assets/avatar.png";
import close_icon from "../assets/icon-close.webp";
import nav_icon from "../assets/dumbell.png";
import fight_icon from "../assets/fight.png";
import leaderboard_icon from "../assets/leaderboard-icon.png";
import logoImage from "../assets/logo.png";

const Navbar = () => {
  // const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);
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
        console.log("Getting user");
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <>
      <nav className={`inapp-navbar ${isOpen ? "open" : ""} phone-navbar`}>
        <button className="fab" onClick={() => setIsOpen(!isOpen)}>
          <img
            className="nav-icon"
            src={isOpen ? close_icon : nav_icon} // Change icon based on isOpen state
            alt="navbar icon"
            style={{ height: isOpen ? "45px" : "75px" }}
          />
        </button>
        {isOpen && (
          <ul className="mobile-navbar-links">
            <li className="nav-item workout-icon">
              <Link to="/create-workout">
                <img
                  className="workout-icon"
                  src={nav_icon}
                  alt="create workout icon"
                />
              </Link>
            </li>
            <li className="nav-item home-icon">
              <Link to="/feed">
                <img src={home_icon} alt="home icon" />
              </Link>
            </li>
            <li className="nav-item hero-icon">
              <Link to="/hero">
                <img src={hero_icon} alt="hero icon" />
              </Link>
            </li>
            <li className="nav-item contact-icon">
              <Link to="/hero-path">
                <img src={fight_icon} alt="fight icon" />
              </Link>
            </li>
            <li className="nav-item contact-icon">
              <Link to="/leaderboard">
                <img src={leaderboard_icon} alt="leaderboard icon" />
              </Link>
            </li>
            {/* <li className="nav-item about-us">
            <Link to="/About">About Us</Link>
          </li> */}
          </ul>
        )}
      </nav>
      <nav className="navbar web-navbar">
        <div className="navbar-logo">
          <img className="logo-image" src={logoImage} alt="Logo" />
          <h1 className="Logo">
            <a href="../" activeclassname="active">
              LevelUp Fitness
            </a>
          </h1>
        </div>
        <ul className="navbar-links">
          {user ? (
            <>
              <li>
                {" "}
                <NavLink to="/hero" activeclassname="active">
                  MyHero
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/create-workout" activeclassname="active">
                  Create Workout
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/feed" activeclassname="active">
                  Feed
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/hero-path" activeclassname="active">
                  Hero Path
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/leaderboard" activeclassname="active">
                  Leaderboard
                </NavLink>
              </li>
            </>
          ) : (
            <NavLink to="/login" activeclassname="active">
              Log In
            </NavLink>
          )}
          {!user && (
            <li>
              <NavLink to="/signup" activeclassname="active">
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
