// Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="navbar-links">
          {user ? (
            <Link to="/hero">MyHero</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Feed</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
