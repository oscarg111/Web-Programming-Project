import React from "react";
import './feedCard.css';

const FeedCard = ({ post, postId }) => {
  return (
    <div className="feed-card">
      <h3>Post {postId}</h3>
      <p>@{post.userName}</p>
      <p>Hero: {post.heroName}</p>
      <p>{post.postContent}</p>
      <p>Hitting: {post.muscleGroup}</p>
    </div>
  );
};

export default FeedCard;
