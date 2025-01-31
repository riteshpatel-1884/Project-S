const express = require("express");
const router = express.Router();
const Company = require("../models/companypost");

// Create a new company post
router.post("/companies", async (req, res) => {
  try {
    const { companyName, applicationLink, role, shortDescription, type } =
      req.body;
    const newCompany = new Company({
      companyName,
      applicationLink,
      role,
      shortDescription,
      type,
    });
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all company posts
router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find().sort({ postDate: -1 }); // Sort by newest
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single company post
router.get("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company post not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a company post
router.put("/companies/:id", async (req, res) => {
  try {
    const { companyName, applicationLink, role, shortDescription, type } =
      req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { companyName, applicationLink, role, shortDescription, type },
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company post not found" });
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a company post
router.delete("/companies/:id", async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company post not found" });
    }
    res.json({ message: "Company post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
