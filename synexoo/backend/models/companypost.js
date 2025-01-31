const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  applicationLink: { type: String, required: true },
  role: { type: String, required: true },
  shortDescription: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  type: { type: String, enum: ["internship", "job"], required: true },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
