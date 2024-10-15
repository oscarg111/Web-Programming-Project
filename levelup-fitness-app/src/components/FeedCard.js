import React from "react";

const FeedCard = ({ post, postId }) => {
  return (
    <div class="card mostly-full-width">
      <h3>Post {postId}</h3>
      <p>@{post.userName}</p>
      <p>Hero: {post.heroName}</p>
      <p>{post.postContent}</p>
      <p>Hitting: {post.muscleGroup}</p>
    </div>
  );
};

export default FeedCard;
