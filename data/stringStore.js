const CryptoJS = require("crypto-js");

let strings = [];

// ===============================
// 🔹 Generate SHA-256 Hash
// ===============================
function generateHash(value) {
  return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
}

// ===============================
// 🔹 Check if a string already exists
// ===============================
function exists(hash) {
  return strings.some((s) => s.id === hash);
}

// ===============================
// 🔹 Save analyzed record
// ===============================
function save(hash, record) {
  strings.push(record);
  return record;
}

// ===============================
// 🔹 Find a string by hash
// ===============================
function find(hash) {
  return strings.find((s) => s.id === hash);
}

// ===============================
// 🔹 Remove string by hash
// ===============================
function remove(hash) {
  const index = strings.findIndex((s) => s.id === hash);
  if (index !== -1) {
    strings.splice(index, 1);
    return true;
  }
  return false;
}

// ===============================
// 🔹 Filter strings based on queries
// ===============================
function filter({ is_palindrome, min_length, max_length, word_count, contains_character }) {
  return strings.filter((s) => {
    const p = s.properties;

    if (is_palindrome !== undefined && p.is_palindrome !== is_palindrome) return false;
    if (min_length !== undefined && p.length < min_length) return false;
    if (max_length !== undefined && p.length > max_length) return false;
    if (word_count !== undefined && p.word_count !== word_count) return false;
    if (
      contains_character !== undefined &&
      !s.value.toLowerCase().includes(contains_character.toLowerCase())
    )
      return false;

    return true;
  });
}

module.exports = {
  generateHash,
  exists,
  save,
  find,
  remove,
  filter,
};
