// Home.js
import React, { useContext } from "react";
import "./Feed.css";
import { Link } from 'react-router-dom';
import LandingNav from "../components/Landing_nav";

const LandingPage = () =>{
  return (
    <div className="Landing-pg">
       <LandingNav />
        <div className="left-column">
            <h1>It's time to LevelUp!</h1>
            <button className="signup-btn">
                <Link to="/signup">Get Started Here!</Link>
            </button>
        </div>
            <div className="right-column">
        <img></img>
      </div>
    </div>
  );
};

export default LandingPage;