// Home.js
import React, { useContext, useState, useEffect } from "react";
import FeedCard from "../components/FeedCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Feed.css";
import smallKnight from "../assets/small knight.png";

const Feed = ({ userLoggedIn }) => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/posts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Add dependency array to avoid multiple calls

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="feed-pg">
      <Navbar />
      <div className="feed-container">
        <h1 className="page-title">feed</h1>
        <div className="feed-cards">
          {posts.map((post, index) => (
            <FeedCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
