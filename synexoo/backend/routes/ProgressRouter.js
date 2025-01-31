const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress"); // Import the Progress model
const User = require("../models/user"); // Import the User model
const ensureAuthenticated = require("../middlewares/Auth");
const Feedback = require("../models/Feedback")
// Get intern's progress
router.get("/progress", ensureAuthenticated, async (req, res) => {
  try {
    const progress = await Progress.find({ internId: req.user._id }); // Fetch progress for the logged-in user
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new progress
router.post("/progress", ensureAuthenticated, async (req, res) => {
  try {
    const newProgress = new Progress({
      internId: req.user._id,
      ...req.body,
    });
    await newProgress.save();
    res.json(newProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress
router.put("/progress/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updatedProgress = await Progress.findOneAndUpdate(
      { _id: req.params.id, internId: req.user._id },
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users-with-progress", ensureAuthenticated, async (req, res) => {
  try {
    const usersWithProgress = await User.aggregate([
      {
        $lookup: {
          from: "userprogresses", // Make sure this matches your actual collection name
          localField: "_id",
          foreignField: "internId",
          as: "progressDetails",
        },
      },
      {
        $unwind: "$progressDetails", // Flatten the progressDetails array
      },
      {
        $project: {
          name: 1,
          email: 1,
          college: 1,
          course: 1,
          graduationYear: 1,
          projectName: "$progressDetails.projectName",
          credential: "$progressDetails.credential",
          challanges: "$progressDetails.challanges",
          next_steps: "$progressDetails.next_steps",
          completed: "$progressDetails.completed",
          status: "$progressDetails.status",
          completionPercentage: "$progressDetails.completionPercentage",
        },
      },
    ]);

    res.status(200).json(usersWithProgress);
  } catch (error) {
    console.error("Error fetching users with progress:", error);
    res.status(500).json({
      message: "Error fetching users with progress",
      error: error.message,
    });
  }
});

router.post("/send-feedback", ensureAuthenticated, async (req, res) => {
  try {
    // Remove the admin-only check if all authenticated users can send feedback
    const { userId, message } = req.body;

    const newFeedback = new Feedback({
      userId,
      senderId: req.user._id, // Use the logged-in user's ID
      message,
      createdAt: new Date(),
      isRead: false,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback sent successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({
      message: "Failed to send feedback",
      error: error.message,
    });
  }
});

// Add this route to your progressrouter.js
router.get("/user-feedbacks", ensureAuthenticated, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ 
      userId: req.user._id 
    }).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching user feedbacks:", error);
    res.status(500).json({ 
      message: "Failed to fetch feedbacks",
      error: error.message 
    });
  }
});



router.put("/feedback/:id/read", ensureAuthenticated, async (req, res) => {
  try {
    const feedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error marking feedback as read:", error);
    res.status(500).json({
      message: "Failed to mark feedback as read",
      error: error.message,
    });
  }
});

router.get(
  "/admin/feedback-history/:userId",
  ensureAuthenticated,
  async (req, res) => {
   

    try {
      // Use role-based check instead of isAdmin
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const feedbacks = await Feedback.find({
        userId: req.params.userId,
        // Remove senderId restriction if not needed
      }).sort({ createdAt: -1 });

      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch feedback history",
        error: error.message,
      });
    }
  }
);


router.delete(
  "/admin/feedback/:feedbackId",
  ensureAuthenticated,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const feedback = await Feedback.findByIdAndDelete(req.params.feedbackId);

      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting feedback",
        error: error.message,
      });
    }
  }
);


module.exports = router;
