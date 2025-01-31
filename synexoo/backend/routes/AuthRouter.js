const { signup, login } = require("../controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");
const ensureAuthenticated = require("../middlewares/Auth");
const User = require("../models/user"); // Ensure User model is imported

const router = require("express").Router();

// Route to handle user login
router.post("/login", loginValidation, login);

// Route to handle user signup
router.post("/signup", signupValidation, signup);

// Route to fetch user details (authenticated users only)
router.get("/user", ensureAuthenticated, async (req, res) => {
  try {
  
    const user = await User.findById(req.user._id); // Replace with your MongoDB query
    if (!user) {
      console.error("User not found for ID:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }
   
    res.json({ user });
  } catch (err) {
    console.error("Error fetching user details:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
