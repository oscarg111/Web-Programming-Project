import React, { useEffect } from "react";
import PRItem from "./PRItem";

const WorkoutStats = ({ workoutsCompleted, totalVolume, lifetimePRs }) => {
  useEffect(() => {
    console.log("being used");
    console.log(Object.keys(lifetimePRs));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div>
      <h1>Workout Stats</h1>
      <p>total workouts: {workoutsCompleted}</p>
      <p>total volume: {totalVolume}</p>
      <p>list of lifetime PRs:</p>
      {Object.keys(lifetimePRs).length > 0
        ? Object.keys(lifetimePRs).map((workout) => (
            <PRItem
              exercise={workout}
              sets={lifetimePRs[workout][0].sets}
              reps={lifetimePRs[workout][0].reps}
              weight={lifetimePRs[workout][0].weight}
              hit_time={formatDate(lifetimePRs[workout][0].hit_time)}
            />
          ))
        : "No Lifetime PRs"}
    </div>
  );
};

export default WorkoutStats;
