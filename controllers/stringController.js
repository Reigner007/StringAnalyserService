const { analyzeString } = require('../Utils/stringUtils');
const stringStore = require('../Data/stringStore');

// ===============================
//  Create / Analyze a new string
// ===============================
exports.createString = (req, res) => {
  const { value } = req.body;

  // Validation
  if (!value) {
    return res.status(400).json({ status: 'error', message: 'Missing "value" field' });
  }
  if (typeof value !== 'string') {
    return res.status(422).json({ status: 'error', message: '"value" must be a string' });
  }

  const hash = stringStore.generateHash(value);

  // Check if it already exists
  if (stringStore.exists(hash)) {
    return res.status(409).json({ status: 'error', message: 'String already exists' });
  }

  // Analyze and store
  const analysis = analyzeString(value);
  stringStore.save(hash, analysis);

  return res.status(201).json(analysis);
};

// ===============================
//  Get info for a specific string
// ===============================
exports.getStringByValue = (req, res) => {
  const { value } = req.params;
  const hash = stringStore.generateHash(value);
  const record = stringStore.find(hash);

  if (!record) {
    return res.status(404).json({ status: 'error', message: 'String not found' });
  }

  return res.status(200).json(record);
};

// ===============================
//  Get all strings with filters
// ===============================
exports.getAllStrings = (req, res) => {
  try {
    const { is_palindrome, min_length, max_length, word_count, contains_character } = req.query;
    const results = stringStore.filter({
      is_palindrome: is_palindrome === 'true' ? true : is_palindrome === 'false' ? false : undefined,
      min_length: min_length ? parseInt(min_length) : undefined,
      max_length: max_length ? parseInt(max_length) : undefined,
      word_count: word_count ? parseInt(word_count) : undefined,
      contains_character
    });

    res.status(200).json({
      data: results,
      count: results.length,
      filters_applied: req.query
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: 'Invalid query parameters' });
  }
};

// ===============================
//  Filter by natural language query
// ===============================
exports.filterByNaturalLanguage = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: 'error', message: 'Missing query parameter' });
  }

  const filters = {};
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('palindromic')) filters.is_palindrome = true;
  if (lowerQuery.includes('single word')) filters.word_count = 1;

  const match = lowerQuery.match(/longer than (\d+)/);
  if (match) filters.min_length = parseInt(match[1]) + 1;

  const containsMatch = lowerQuery.match(/containing the letter (\w)/);
  if (containsMatch) filters.contains_character = containsMatch[1];

  if (Object.keys(filters).length === 0) {
    return res.status(400).json({ status: 'error', message: 'Unable to parse natural language query' });
  }

  const results = stringStore.filter(filters);

  res.status(200).json({
    data: results,
    count: results.length,
    interpreted_query: {
      original: query,
      parsed_filters: filters
    }
  });
};

// ===============================
//  Delete a string
// ===============================
exports.deleteString = (req, res) => {
  const { value } = req.params;
  const hash = stringStore.generateHash(value);
  const deleted = stringStore.remove(hash);

  if (!deleted) {
    return res.status(404).json({ status: 'error', message: 'String not found' });
  }

  return res.status(204).send(); // No Content
};
