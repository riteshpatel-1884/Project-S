// routes/onefiftydsa.js
const express = require("express");
const router = express.Router();
const UserProgressModel = require("../models/onefifty");
const ensureAuthenticated = require("../middlewares/Auth");
const { validateQuestionId } = require("../middlewares/validation");

// Get user progress
router.get("/user/progress", ensureAuthenticated, async (req, res) => {
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
router.put(
  "/user/progress/solved",
  ensureAuthenticated,
  validateQuestionId,
  async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;

   

    try {
      let userProgress = await UserProgressModel.findOne({ userId }).lean();
     
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

     

      await UserProgressModel.updateOne(
        { userId: userId },
        { $set: { solvedQuestions: userProgress.solvedQuestions } },
        { upsert: true }
      );

      res.status(200).json({ solvedQuestions: userProgress.solvedQuestions });
    } catch (err) {
      console.error("Error saving solved question:", err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
        stack: err.stack,
      });
    }
  }
);
router.put(
  "/user/progress/bookmarked",
  ensureAuthenticated,
  validateQuestionId,
  async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;


    try {
      let userProgress = await UserProgressModel.findOne({ userId }).lean();
   
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
     
      await UserProgressModel.updateOne(
        { userId: userId },
        { $set: { bookmarkedQuestions: userProgress.bookmarkedQuestions } },
        { upsert: true }
      );

      res
        .status(200)
        .json({ bookmarkedQuestions: userProgress.bookmarkedQuestions });
    } catch (err) {
      console.error("Error saving bookmarked question:", err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
        stack: err.stack,
      });
    }
  }
);

router.put("/user/progress/notes", ensureAuthenticated, async (req, res) => {
  const { questionId, note } = req.body;
  const userId = req.user._id;

  try {
    const updatedUserProgress = await UserProgressModel.findOneAndUpdate(
      { userId },
      { $set: { "notes.$[elem].note": note } },
      {
        arrayFilters: [{ "elem.questionId": questionId }],
        new: true,
        upsert: true,
      }
    );

    // If no note was updated, add it
    if (
      updatedUserProgress.notes.filter(
        (noteData) => noteData.questionId === questionId
      ).length === 0
    ) {
      const updatedUserProgressWithNote =
        await UserProgressModel.findOneAndUpdate(
          { userId },
          { $push: { notes: { questionId, note } } },
          { new: true }
        );
      return res.status(200).json({ notes: updatedUserProgressWithNote.notes });
    }

    res.status(200).json({ notes: updatedUserProgress.notes });
  } catch (err) {
    console.error("Error saving notes:", err);
    res
      .status(500)
      .json({
        message: "Internal server error",
        error: err.message,
        stack: err.stack,
      }); //Include stack
  }
});

module.exports = router;
