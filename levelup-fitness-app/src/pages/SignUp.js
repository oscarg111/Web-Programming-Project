import React from "react";
import UserSignup from "../components/UserSignup";
import "./Signup.css";
import LandingNav from "../components/Landing_nav";

let SignUpPage = () => {
  return (
    <div>
      <LandingNav />
      <div class="signup-page">
        <UserSignup />
      </div>
    </div>
  );
};

export default SignUpPage;
