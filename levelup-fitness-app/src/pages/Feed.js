// Home.js
import React, { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import FeedCard from "../components/FeedCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Feed.css";
import smallKnight from "../assets/small knight.png";
import { useNavigate } from "react-router-dom";

const Feed = ({ userLoggedIn }) => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // get user/hero data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 500) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
        console.log(user);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

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

  return username ? (
    <div className="feed-pg">
      <Navbar />
      <div className="feed-container">
        <h1 className="page-title">feed for {username}</h1>
        <div className="feed-cards">
          {posts.map((post, index) => (
            <FeedCard key={index} post={post} username={username} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="feed-pg">
      <Navbar />
      <div className="feed-container">
        <div className="feed-cards">
          <h1>Login to see Feed</h1>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
