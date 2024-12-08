const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
  },
  commenter: {
    type: String,
    required: true,
  },
  commentTime: {
    type: Date,
    default: Date.now, // sets default to current date and time
  },
});

const PostSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  heroName: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  workout: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // sets default to current date and time
  },
  comments: {
    type: [comment],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
