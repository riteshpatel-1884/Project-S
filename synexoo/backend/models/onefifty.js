// models/UserProgress.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProgressSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    solvedQuestions: {
      type: [Number],
      default: [],
    },
    bookmarkedQuestions: {
      type: [Number],
      default: [],
    },
    notes: [
      {
        questionId: {
          type: Number,
          required: true,
        },
        note: {
          type: String,
          required: true,
        },
        lastUpdated: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
UserProgressSchema.index({ userId: 1 });
UserProgressSchema.index({ "notes.questionId": 1 });

const UserProgress = mongoose.model("DSAProgress", UserProgressSchema);
module.exports = UserProgress;
