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

const ExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
  },
  weight: {
    type: Number,
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
  lifetimePRs: {
    type: Map,
    of: [ExerciseSchema],
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
  userStats: {
    type: UserStatsSchema,
    required: false,
    default: { workoutsCompleted: 0, totalVolume: 0, lifetimePRs: [] },
  },
  lastPosted: {
    type: Number,
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
