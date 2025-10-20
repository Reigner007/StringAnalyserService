const express = require('express');
const router = express.Router();
const {
  createString,
  getStringByValue,
  getAllStrings,
  filterByNaturalLanguage,
  deleteString
} = require('../Controllers/stringController');

// ====== ROUTES ======

//  Create / Analyze a new string
router.post('/', createString);

//  Filter strings using natural language
router.get('/filter-by-natural-language', filterByNaturalLanguage);

//  Get all strings with query filters
router.get('/', getAllStrings);

//  Get info for a specific string
router.get('/:value', getStringByValue);

//  Delete a string
router.delete('/:value', deleteString);

module.exports = router;
