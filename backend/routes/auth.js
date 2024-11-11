require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user
  try {
    const user = new User({ username, password });
    await user.save();
    console.log("Created new user: ", user);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing up user", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Sign JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// create post
router.post("/postWorkout", async (req, res) => {
  console.log(req.body);
  const { userName, heroName, postContent, workout } = req.body;
  console.log(userName, heroName, postContent, workout);

  // Basic validation
  if (!userName || !postContent) {
    return res
      .status(400)
      .json({ message: "username and post content are required" });
  }

  // Create new workout
  try {
    const post = new Post({ userName, heroName, postContent, workout });
    await post.save();
    console.log("Created new post: ", post);
    res.status(201).json({ message: "post created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error making post", error: error.message });
  }
});

router.get("/user", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId).select("username");
    console.log(user, "logging user");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
