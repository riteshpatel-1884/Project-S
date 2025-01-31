const express = require("express");
const router = express.Router();
const UserProgressModel = require("../models/weeklyseries");
const ensureAuthenticated = require("../middlewares/Auth");
const { validateweeklyQuestionId } = require("../middlewares/validationweekly");

// Get user progress
router.get("/user/weeklyprogress", ensureAuthenticated, async (req, res) => {
  const userId = req.user._id;

  try {
    const userProgress = await UserProgressModel.findOne({ userId });

    if (!userProgress) {
      return res.status(200).json({
        solvedQuestions: [],
        bookmarkedQuestions: [],
        notes: [],
      });
    }

    res.status(200).json({
      solvedQuestions: userProgress.solvedQuestions,
      bookmarkedQuestions: userProgress.bookmarkedQuestions,
      notes: userProgress.notes,
    });
  } catch (err) {
    console.error("Error fetching user progress:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Save solved question
router.put(
  "/user/weeklyprogress/solved",
  ensureAuthenticated,
  validateweeklyQuestionId,
  async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;

    try {
      let userProgress = await UserProgressModel.findOne({ userId });

      if (!userProgress) {
        userProgress = new UserProgressModel({ userId, solvedQuestions: [] });
      }
      if (userProgress.solvedQuestions.includes(questionId)) {
        userProgress.solvedQuestions = userProgress.solvedQuestions.filter(
          (id) => id !== questionId
        );
      } else {
        userProgress.solvedQuestions.push(questionId);
      }

      await userProgress.save();
      res.status(200).json({ solvedQuestions: userProgress.solvedQuestions });
    } catch (err) {
      console.error("Error saving solved question:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Save bookmarked question
router.put(
  "/user/weeklyprogress/bookmarked",
  ensureAuthenticated,
  validateweeklyQuestionId,
  async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;

    try {
      let userProgress = await UserProgressModel.findOne({ userId });

      if (!userProgress) {
        userProgress = new UserProgressModel({
          userId,
          bookmarkedQuestions: [],
        });
      }

      if (userProgress.bookmarkedQuestions.includes(questionId)) {
        userProgress.bookmarkedQuestions =
          userProgress.bookmarkedQuestions.filter((id) => id !== questionId);
      } else {
        userProgress.bookmarkedQuestions.push(questionId);
      }

      await userProgress.save();
      res
        .status(200)
        .json({ bookmarkedQuestions: userProgress.bookmarkedQuestions });
    } catch (err) {
      console.error("Error saving bookmarked question:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Save notes
router.put(
  "/user/weeklyprogress/notes",
  ensureAuthenticated,
  async (req, res) => {
    const { questionId, note } = req.body;
    const userId = req.user._id;

    try {
      let userProgress = await UserProgressModel.findOne({ userId });

      if (!userProgress) {
        userProgress = new UserProgressModel({ userId, notes: [] });
      }
      const existingNoteIndex = userProgress.notes.findIndex(
        (n) => n.questionId === questionId
      );

      if (existingNoteIndex !== -1) {
        userProgress.notes[existingNoteIndex].note = note;
      } else {
        userProgress.notes.push({ questionId: Number(questionId), note });
      }

      await userProgress.save();
      res.status(200).json({ notes: userProgress.notes });
    } catch (err) {
      console.error("Error saving notes:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
