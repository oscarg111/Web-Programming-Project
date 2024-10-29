import React from "react";
import UserLogin from "../components/UserLogin";
import "./Login.css";

let LogInPage = () => {
  let signUp = true;
  return (
    <div class="login-page">
      <UserLogin />
    </div>
  );
};

export default LogInPage;
