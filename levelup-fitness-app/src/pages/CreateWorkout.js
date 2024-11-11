// Home.js
import React, { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./CreateWorkout.css";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

const CreateWorkout = () => {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [workoutList, setWorkoutList] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [units, setUnits] = useState("lbs");

  // get user/hero data
  useEffect(() => {
    console.log("Page reload");
    console.log(user);
    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("token");
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // fetch UID from mongoDB with api call
        fetch(`${process.env.REACT_APP_API_URL}/auth/user?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Setting user Data");
            setUsername(data.username);
            setHeroData({
              name: data.username,
              health: 50,
              maxHealth: 100,
              attack: 10,
              defense: 20,
            });
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleAddWorkout = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username);
    fetch(`${process.env.REACT_APP_API_URL}/auth/postWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        heroName: username,
        postContent: description,
        workout: workoutList,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    let currentWorkout = `${exerciseName}: ${sets}x${reps} at ${weight}${units}`;
    setWorkoutList([...workoutList, currentWorkout]);
  };

  return (
    <div class="create-workout-page">
      <Navbar />
      <div className="create-workout-card">
        <form onSubmit={handleAddWorkout} className="create-workout-form">
          <h1>Make a workout for {username ? username : "Loading"}</h1>
          <p>Workout Description</p>
          <input
            id="workoutDescription"
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          {/*this is for the post content */}
          <p>Exercise Name:</p>
          <input
            id="exerciseName"
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <p>Number of sets:</p>
          <input id="setCount" onChange={(e) => setSets(e.target.value)} />
          <p>Number of reps per set:</p>
          <input id="repCount" onChange={(e) => setReps(e.target.value)} />
          <div>
            <p>Weight:</p>
            <input id="weight" onChange={(e) => setWeight(e.target.value)} />
            <select id="units" onChange={(e) => setUnits(e.target.value)}>
              <option>lbs</option>
              <option>kgs</option>
            </select>
            <button onClick={handleAddExercise}>+</button>
          </div>
          <ul>
            {workoutList.map((workout, index) => (
              <li key={index}>{workout}</li>
            ))}
          </ul>
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default CreateWorkout;
