import React, { useState } from "react";
import reportIcon from "../assets/report.png";
import commentIcon from "../assets/comment_icon.png";
import ReportPopup from "./report";
import "./feedCard.css";

const FeedCard = ({ post, postId }) => {
  return (
    <div className="feed-card">
      <div className="card-top">
        <p>@{post.userName} uploaded a new workout</p>
        <ReportPopup />
      </div>
      <div className="upload-info">
        <div className="character-column">
          <img className="hero-image" src={post.heroImg} alt="hero image" />
        </div>
        <div className="workout-column">
          <div className="workout-info">
            <p>Hero: {post.heroName}</p>
            <p>{post.postContent}</p>
            <p>
              Workout:
              {post.workout.map((exercise) => (
                <p>{exercise}</p>
              ))}
            </p>
          </div>
        </div>
        <div className="comment-section">
          <img src={commentIcon} alt="comment button" />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
