// Home.js
import React, { useContext } from "react";
import FeedCard from "../components/FeedCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import './Feed.css';

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
    <div className="feed-pg">
      <Navbar />
      <div className="feed-container">
      <h1 className="page-title">feed</h1>
        <div className="feed-cards">
          {postList.map((post, index) => (
            <FeedCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
