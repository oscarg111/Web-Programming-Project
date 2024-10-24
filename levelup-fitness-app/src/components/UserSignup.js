import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username, password);

    let postBody = {
      username: username,
      password: password,
    };

    console.log(JSON.stringify(postBody));

    fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful login: ", data);
        console.log(data.token == 200);
        if (data.token) {
          login(data);
        }
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="card">
      <h1>SignUp</h1>
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
        <button type="submit">SignUp</button>
      </form>
      <br></br>
      <p>
        Already have an account? <Link to="/login">Log in!</Link>
      </p>
    </div>
  );
};

export default UserSignup;
