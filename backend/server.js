// server.js
require("dotenv").config(); // for environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // routes for api

const app = express();
const PORT = process.env.PORT || 5000; // port that server runs on
const MONGO_URI = process.env.MONGO_URI; // reference to database URI

console.log("hello");
try {
  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Use authentication routes
  app.use("/auth", authRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(`there was an error running the server: ${error}`);
}
