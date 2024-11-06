// Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";
import "./LandingNav.css";

const LandingNav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="Logo">
          <a href="../">LevelUp Fitness</a>
        </h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-links">
          {user ? (
            <Link to="/hero">MyHero</Link>
        ) : (
            <Link to="/login">Log In</Link>
        )}
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNav;
