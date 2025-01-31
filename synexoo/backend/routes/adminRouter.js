const {
  adminLogin,
  createAdminAccount,
} = require("../controllers/adminController");
const { adminLoginValidation } = require("../middlewares/adminValidation");
const router = require("express").Router();

// Separate admin login route
router.post("/admin/login", adminLoginValidation, adminLogin);

// Route to create an admin account (you might want to secure this further)
router.post("/admin/create", createAdminAccount);

module.exports = router;
