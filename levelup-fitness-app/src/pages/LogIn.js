import React from "react";
import UserLogin from "../components/UserLogin";
import "./Login.css";
import LandingNav from "../components/Landing_nav";
import Navbar from "../components/Navbar";

let LogInPage = () => {
  let signUp = true;
  return (
    <div>
      <Navbar />
      <div class="login-page">
        <UserLogin />
      </div>
    </div>
  );
};

export default LogInPage;
