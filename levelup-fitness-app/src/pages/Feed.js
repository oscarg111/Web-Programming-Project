// Home.js
import React, { useContext } from "react";
import FeedCard from "../components/FeedCard";
import { AuthContext } from "../contexts/AuthContext";
import "./Feed.css";
import { Link } from 'react-router-dom';

const Feed = ({ userLoggedIn }) => {
  const { user, logout } = useContext(AuthContext);
  let postList = [
    {
      userName: "ogross1",
      heroName: "Jimmy",
      postContent: "This is a test post",
      muscleGroup: "chest and back",
    },
    {
      userName: "jdoe22",
      heroName: "Iron John",
      postContent: "Had a great leg day!",
      muscleGroup: "legs",
    },
    {
      userName: "marySmith33",
      heroName: "Lightning Lass",
      postContent: "Crushed some upper body exercises!",
      muscleGroup: "arms and shoulders",
    },
    {
      userName: "superman4",
      heroName: "Kal El",
      postContent: "Flew through my cardio session today.",
      muscleGroup: "cardio",
    },
    {
      userName: "wonderwoman5",
      heroName: "Diana Prince",
      postContent: "Focused on core strength today!",
      muscleGroup: "core",
    },
    {
      userName: "batman6",
      heroName: "Dark Knight",
      postContent: "Worked on endurance and agility.",
      muscleGroup: "full body",
    },
    {
      userName: "captainAmerica7",
      heroName: "Cap",
      postContent: "Crushed another back workout!",
      muscleGroup: "back",
    },
    {
      userName: "flash8",
      heroName: "Scarlet Speedster",
      postContent: "Ran some intense sprints today.",
      muscleGroup: "legs and cardio",
    },
    {
      userName: "thor9",
      heroName: "God of Thunder",
      postContent: "Lifted heavy weights today!",
      muscleGroup: "arms and chest",
    },
    {
      userName: "blackwidow10",
      heroName: "Natasha Romanoff",
      postContent: "Worked on agility and reflexes.",
      muscleGroup: "full body",
    },
  ];

  return (
    <div className="Landing-pg">
      <div className="left-column">
        <h1>It's time to LevelUp!</h1>
        {user ? (
          postList.map((post, index) => <FeedCard postId={index} post={post} />)
        ) : (
          <button className="signup-btn">
            <Link to="/signup">Get Started Here!</Link>
          </button>
        )}
      </div>
      <div className="right-column">
        <img></img>
      </div>
    </div>
  );
};

export default Feed;
