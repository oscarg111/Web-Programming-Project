import React, { useEffect } from "react";

const WorkoutStats = ({ workoutsCompleted, totalVolume, lifetimePRs }) => {
  useEffect(() => {
    console.log("being used");
  }, []);
  return (
    <div>
      <h1>Workout Stats</h1>
      <p>total workouts: {workoutsCompleted}</p>
      <p>total volume: {totalVolume}</p>
      <p>list of lifetime PRs:</p>
      {lifetimePRs.length > 0 ? lifetimePRs.map((pr) => {}) : "No Lifetime PRs"}
    </div>
  );
};

export default WorkoutStats;
