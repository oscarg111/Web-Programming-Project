import React, { useState } from "react";

const UserSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSubmit = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username, password);
    fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div class="card">
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
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default UserSignup;
