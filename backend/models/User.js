const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

const UserStatsSchema = new mongoose.Schema({
  workoutsCompleted: {
    type: Number,
    required: true,
  },
  totalVolume: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 18,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Password should have a minimum length for security
  },
  heroes: {
    type: [HeroSchema],
    default: [],
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
