const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Post", PostSchema);
