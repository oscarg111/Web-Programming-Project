import React from "react";
import reportIcon from '../assets/report.png';
import commentIcon from '../assets/comment_icon.png';
import './feedCard.css';

const FeedCard = ({ post, postId }) => {
  return (
    <div className="feed-card">
      <div className="card-top">
        <p>@{post.userName} uploaded a new workout</p>
        <img className="report-icon " src={reportIcon} alt="report button" />
      </div>
        <div className="upload-info">
          <div className="character-column">
            <img className="hero-image" src={post.heroImg} alt="hero image"/>
          </div>
          <div className="workout-column">
            <div className="workout-info">
              <p>Hero: {post.heroName}</p>
              <p>{post.postContent}</p>
              <p>Hitting: {post.muscleGroup}</p>
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
