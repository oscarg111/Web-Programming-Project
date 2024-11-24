const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stats: {
    type: Map,
    of: Number,
  },
});

module.exports = mongoose.model("Heroes", HeroSchema);
