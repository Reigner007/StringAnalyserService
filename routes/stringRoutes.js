const express = require("express");
const router = express.Router();
const {
  createString,
  getStringByValue,
  getAllStrings,
  filterByNaturalLanguage,
  deleteString,
} = require("../controllers/stringController");

// ===================================
// 🔹 ROUTE DEFINITIONS (Ordered Correctly)
// ===================================

// 🟢 Create & Analyze a String
// POST /strings
router.post("/", createString);

// 🔍 Natural Language Filtering
// GET /strings/filter-by-natural-language?query=show me palindromes
router.get("/filter-by-natural-language", filterByNaturalLanguage);

// 🧩 Get All Strings with Optional Query Filters
// GET /strings?minLength=3&maxLength=10&palindrome=true
router.get("/", getAllStrings);

// 🔎 Get Details of a Specific String
// GET /strings/:value
router.get("/:value", getStringByValue);

// ❌ Delete a Specific String
// DELETE /strings/:value
router.delete("/:value", deleteString);

module.exports = router;
