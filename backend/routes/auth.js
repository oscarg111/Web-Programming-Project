require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Heroes = require("../models/Heroes");
const router = express.Router();

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// helper function for parsing workout
function parseWorkout(statement) {
  // Regular expression to match workout components
  const regex = /(.+): (\d+)x(\d+) at (\d+)(lbs|kgs)/;
  const match = statement.match(regex);

  if (match) {
    const exercise = match[1]; // Exercise name
    const sets = parseInt(match[2]); // Number of sets
    const reps = parseInt(match[3]); // Number of reps
    let weight = parseInt(match[4]); // Weight
    const unit = match[5]; // Unit (lbs or kgs)

    // Convert weight to lbs if in kgs
    if (unit === "kgs") {
      weight = Math.round(weight * 2.20462); // Convert kgs to lbs
    }

    const totalVolume = sets * reps * weight; // Calculate total volume

    return {
      exercise,
      sets,
      reps,
      weight: weight, // Always show weight in lbs
      totalVolume: totalVolume,
    };
  } else {
    return "Invalid format";
  }
}

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
  const { userName, heroName, postContent, workout } = req.body;

  // Basic validation
  if (!userName || !postContent) {
    return res
      .status(400)
      .json({ message: "username and post content are required" });
  }
  console.log(userName);
  let user = await User.findOne({ username: userName });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);
  const today = new Date();
  const dayIndex = today.getDay();

  // Create new workout
  try {
    if (user.lastPosted === dayIndex) {
      // cant post two workouts in one day
      console.log("User tried to make two posts");
      res.status(400).json({ message: "cant make two posts in one day" });
    } else {
      const post = new Post({ userName, heroName, postContent, workout });
      user.lastPosted = dayIndex;

      // update the user workout stats with the new workout
      user.userStats.workoutsCompleted += 1; // update completed workouts

      // sum current workout volume
      let workoutVolume = 0;
      console.log(workout);

      for (let exercise of workout) {
        let currentExercise = parseWorkout(exercise);
        workoutVolume += currentExercise.totalVolume;

        // Configure PRs
        const currentPR = user.userStats.lifetimePRs.find(
          (pr) => pr.exercise === currentExercise.exercise
        );

        if (!currentPR) {
          currentExercise.hit_time = new Date();
          user.userStats.lifetimePRs.push(currentExercise);
        } else if (
          currentExercise.weight > currentPR.weight ||
          (currentExercise.weight === currentPR.weight &&
            currentExercise.sets >= currentPR.sets &&
            currentExercise.reps >= currentPR.reps)
        ) {
          currentExercise.hit_time = new Date();
          const index = user.userStats.lifetimePRs.indexOf(currentPR);
          if (index !== -1) {
            user.userStats.lifetimePRs[index] = currentExercise;
          }
        }
      }
      console.log(user.userStats.lifetimePRs);

      user.userStats.totalVolume += workoutVolume;

      await post.save();
      await user.save();
      res.status(201).json({ message: "post created" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error making post", error: error.message });
  }
});

// add a comment
router.post("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    const { commentContent, commenter } = req.body;
    const comment = req.body;
    if (!commentContent || !commenter) {
      return res.status(400).send("Request body not full");
    }

    comment.commentTime = new Date();

    post.comments.push(req.body);
    await post.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add hero to specific users array
router.post("/addhero/:id", async (req, res) => {
  // with the user id, will add the hero in the body
  // to the user's hero array
  const id_num = req.params.id;
  try {
    const hero = await Heroes.findOne({ name: req.body.name });
    const user = await User.findOne({ _id: id_num });

    if (!hero || !user) {
      return res.status(404).json({ message: "Hero or User not found" });
    }

    let heroExists = user.heroes.some(
      (_hero) => _hero._id.toString() === hero._id.toString()
    );

    console.log("Hero Exists: ", heroExists);

    if (!heroExists) {
      console.log("Adding hero");
      user.heroes.push(hero);
      await user.save();

      res.status(200).json({ message: "Hero added successfully" });
    } else {
      res.status(400).json({ message: "User already has that hero" });
    }
  } catch (error) {
    console.error("Error adding hero to ");
  }
});

// update post method
router.put("/updateWorkout/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userName, heroName, postContent, workout } = req.body;

  // Basic validation
  if (!userName || !postContent || !workout || !Array.isArray(workout)) {
    return res
      .status(400)
      .json({ message: "username, post content, and workout are required" });
  }

  try {
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let user = await User.findOne({ username: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate old workout volume and subtract from user's totalVolume
    let oldWorkoutVolume = 0;
    for (let exercise of post.workout) {
      const parsedExercise = parseWorkout(exercise);
      oldWorkoutVolume += parsedExercise.totalVolume;

      // If the old workout exercise was a PR, check if it is being updated
      const currentPR = user.userStats.lifetimePRs.find(
        (pr) => pr.exercise === parsedExercise.exercise
      );

      if (
        currentPR &&
        currentPR.weight === parsedExercise.weight &&
        currentPR.sets === parsedExercise.sets &&
        currentPR.reps === parsedExercise.reps
      ) {
        // Remove the PR temporarily until recalculation
        user.userStats.lifetimePRs = user.userStats.lifetimePRs.filter(
          (pr) => pr.exercise !== currentPR.exercise
        );
      }
    }

    user.userStats.totalVolume -= oldWorkoutVolume;

    // Update post content and workout
    post.postContent = postContent;
    post.heroName = heroName;
    post.workout = workout;

    let newWorkoutVolume = 0;

    for (let exercise of workout) {
      let currentExercise = parseWorkout(exercise);
      newWorkoutVolume += currentExercise.totalVolume;

      // Update or add PRs
      const currentPR = user.userStats.lifetimePRs.find(
        (pr) => pr.exercise === currentExercise.exercise
      );

      if (!currentPR) {
        currentExercise.hit_time = new Date();
        user.userStats.lifetimePRs.push(currentExercise);
      } else if (
        currentExercise.weight > currentPR.weight ||
        (currentExercise.weight === currentPR.weight &&
          currentExercise.sets >= currentPR.sets &&
          currentExercise.reps >= currentPR.reps)
      ) {
        currentExercise.hit_time = new Date();
        const index = user.userStats.lifetimePRs.indexOf(currentPR);
        if (index !== -1) {
          user.userStats.lifetimePRs[index] = currentExercise;
        }
      }
    }

    user.userStats.totalVolume += newWorkoutVolume;

    await post.save();
    await user.save();

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
});

router.get("/getheroes", async (req, res) => {
  try {
    const heroes = await Heroes.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user data from JWT
router.get("/user", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user by userId
    const user = await User.findById(userId).select("-password"); // Exclude sensitive fields like password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send back the user data
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});

// get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get comments form a specific post
router.get("/comments/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    const comments = post.comments.sort(
      (a, b) => new Date(b.commentTime) - new Date(a.commentTime)
    );
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a post
router.delete("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send("Post deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
