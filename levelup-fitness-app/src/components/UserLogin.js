import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import DropdownAlert from "./Alert";
import "./UserLogin.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // useState for showing alert
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username, password);
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful login: ", data);
        console.log(data.token === 200);
        if (data.token) {
          login(data);
          navigate("/hero");
          // trigger alert
        } else {
          console.log("Handling show alert");
          setShowAlert(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" login-card">
      <h1>Login</h1>
      <form onSubmit={handleUserSubmit}>
        <p>Username:</p>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password:</p>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit">Log In</button>
      </form>
      <hr />
      <p className="alr-account">Don't have an account?</p>
      <button>
        <Link to="/signup">Sign Up!</Link>
      </button>
      {showAlert && <DropdownAlert message={"Login Failed"} />}
    </div>
  );
};

export default UserLogin;
