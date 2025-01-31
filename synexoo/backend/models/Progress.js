const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  internId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  credential: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  challanges: {
    type: String,
    required: true,
  },
  next_steps: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  completionPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("UserProgress", ProgressSchema);
module.exports = model;