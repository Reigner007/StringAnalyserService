const crypto = require('crypto');

// 🧠 In-memory store for analyzed strings
const strings = new Map();

/**
 * 🔹 Generate SHA256 hash (same as utils)
 */
function generateHash(value) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 10);
}

/**
 * 🔹 Save analyzed string
 */
function save(hash, data) {
  strings.set(hash, data);
}

/**
 * 🔹 Find a string by its hash
 */
function find(hash) {
  return strings.get(hash) || null;
}

/**
 * 🔹 Check if a string already exists
 */
function exists(hash) {
  return strings.has(hash);
}

/**
 * 🔹 Remove a string
 */
function remove(hash) {
  return strings.delete(hash);
}

/**
 * 🔹 Filter strings with multiple criteria
 */
function filter(filters = {}) {
  let results = Array.from(strings.values());

  if (filters.is_palindrome !== undefined) {
    const isPal = filters.is_palindrome === 'true' || filters.is_palindrome === true;
    results = results.filter(s => s.is_palindrome === isPal);
  }

  if (filters.min_length) {
    results = results.filter(s => s.length >= parseInt(filters.min_length));
  }

  if (filters.max_length) {
    results = results.filter(s => s.length <= parseInt(filters.max_length));
  }

  if (filters.word_count) {
    results = results.filter(s => s.word_count === parseInt(filters.word_count));
  }

  if (filters.contains_character) {
    const char = filters.contains_character.toLowerCase();
    results = results.filter(s => s.value.toLowerCase().includes(char));
  }

  return results;
}

module.exports = {
  generateHash,
  save,
  find,
  exists,
  remove,
  filter
};
