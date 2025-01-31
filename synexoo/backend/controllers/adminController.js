const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AdminModel.findOne({ username });
    const errorMsg = "Authentication failed: invalid credentials";

    if (!admin) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, admin.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { username: admin.username, _id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Admin Login Success",
      success: true,
      jwtToken,
      username: admin.username,
      role: "admin",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const createAdminAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists",
        success: false,
      });
    }

    const adminModel = new AdminModel({
      username,
      email,
      password,
    });

    // Hash the password
    adminModel.password = await bcrypt.hash(password, 10);
    await adminModel.save();

    res.status(201).json({
      message: "Admin account created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  adminLogin,
  createAdminAccount,
};
