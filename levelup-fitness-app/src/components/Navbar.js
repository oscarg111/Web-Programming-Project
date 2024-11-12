// Navbar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./navbar.css";
import { AuthContext } from "../contexts/AuthContext";
import home_icon from "../assets/home.png";
import hero_icon from "../assets/avatar.png";
import close_icon from "../assets/icon-close.webp";
import nav_icon from "../assets/dumbell.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`inapp-navbar ${isOpen ? "open" : ""}`}>
      <button className="fab" onClick={() => setIsOpen(!isOpen)}>
        <img
          className="nav-icon"
          src={isOpen ? close_icon : nav_icon} // Change icon based on isOpen state
          alt="navbar icon"
          style={{ height: isOpen ? "45px" : "75px" }}
        />
      </button>
      {isOpen && (
        <ul className="navbar-links">
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
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item about-us">
            <Link to="/About">About Us</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
