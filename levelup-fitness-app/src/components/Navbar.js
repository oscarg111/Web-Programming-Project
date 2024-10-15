// Navbar.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="navbar-links">
          <Link to="/hero">MyHero</Link>
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
