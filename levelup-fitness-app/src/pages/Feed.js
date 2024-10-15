// Home.js
import React from "react";
import FeedCard from "../components/FeedCard";

const Feed = () => {
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
    <div>
      <h1>It's time to LevelUp!</h1>
      <div class="page">
        {postList.map((post, index) => (
          <FeedCard postId={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
