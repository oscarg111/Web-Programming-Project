import React, { useState, useEffect } from "react";
import "./UpdatePost.css";

const UpdatePost = ({ post, onClose, onUpdate }) => {
  const [description, setDescription] = useState(post.description || "");
  const [workoutList, setWorkoutList] = useState(post.workout || []);
  const [editIndex, setEditIndex] = useState(null);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [units, setUnits] = useState("lbs");

  // Fill the form for editing a specific exercise
  const handleEditExercise = (index) => {
    const [name, setsRepsWeight] = workoutList[index].split(": ");
    const [setsReps, weightUnits] = setsRepsWeight.split(" at ");
    const [sets, reps] = setsReps.split("x");
    const [weight, units] = weightUnits.split(/(lbs|kgs)/);

    setEditIndex(index);
    setExerciseName(name.trim());
    setSets(sets.trim());
    setReps(reps.trim());
    setWeight(weight.trim());
    setUnits(units.trim());
  };

  // Save changes to the edited exercise
  const handleSaveExercise = () => {
    const updatedExercise = `${exerciseName}: ${sets}x${reps} at ${weight}${units}`;
    const updatedWorkoutList = [...workoutList];
    if (editIndex !== null) {
      updatedWorkoutList[editIndex] = updatedExercise;
    } else {
      updatedWorkoutList.push(updatedExercise);
    }

    setWorkoutList(updatedWorkoutList);
    clearExerciseFields();
  };

  // Remove an exercise from the workout
  const handleDeleteExercise = (index) => {
    const updatedWorkoutList = workoutList.filter((_, i) => i !== index);
    setWorkoutList(updatedWorkoutList);
  };

  // Clear input fields after saving or canceling
  const clearExerciseFields = () => {
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
    setUnits("lbs");
    setEditIndex(null);
  };

  // Submit the updated post to the backend
  const handleUpdatePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/updatePost`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.id,
        description,
        workout: workoutList,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data); // Notify parent about the update
        onClose(); // Close the modal
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="update-post-popup">
      <div className="update-post-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Update Workout</h2>
        <form>
          <p>Workout Description</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h3>Exercises</h3>
          {workoutList.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <span>{exercise}</span>
              <button type="button" onClick={() => handleEditExercise(index)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteExercise(index)}>
                Delete
              </button>
            </div>
          ))}

          <div className="exercise-form">
            <p>Exercise Name:</p>
            <input
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
            <p>Number of Sets:</p>
            <input
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <p>Number of Reps:</p>
            <input
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <p>Weight:</p>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select value={units} onChange={(e) => setUnits(e.target.value)}>
              <option>lbs</option>
              <option>kgs</option>
            </select>
            <button type="button" onClick={handleSaveExercise}>
              {editIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </form>
        <button className="update-btn" onClick={handleUpdatePost}>
          Update Post
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
