import React from "react";
import UserLogin from "../components/UserLogin";
import "./Login.css";
import LandingNav from "../components/Landing_nav";

let LogInPage = () => {
  let signUp = true;
  return (
    <div>
      <LandingNav />
      <div class="login-page">
        <UserLogin />
      </div>
    </div>
  );
};

export default LogInPage;
