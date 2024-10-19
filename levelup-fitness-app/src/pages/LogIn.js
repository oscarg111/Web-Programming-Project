import React from "react";
import UserLogin from "../components/UserLogin";
import UserSignup from "../components/UserSignup";

let LogInPage = () => {
  let signUp = true;
  return <div class="page">{signUp ? <UserSignup /> : <UserLogin />}</div>;
};

export default LogInPage;
