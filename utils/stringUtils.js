const CryptoJS = require("crypto-js");

/**
 * 🔹 Check if a string is a palindrome (case-insensitive)
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

/**
 * 🔹 Count unique alphanumeric characters
 */
function countUniqueCharacters(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return new Set(cleaned).size;
}

/**
 * 🔹 Count number of words
 */
function countWords(str) {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * 🔹 Get character frequency map (only alphanumeric)
 */
function getCharacterFrequency(str) {
  const freq = {};
  for (const char of str.toLowerCase()) {
    if (/[a-z0-9]/.test(char)) {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  return freq;
}

/**
 * 🔹 Generate SHA-256 hash (for unique identification)
 */
function generateHash(str) {
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

/**
 * 🔹 Analyze and format a string result
 */
function analyzeString(value) {
  if (typeof value !== "string") {
    throw new Error("Input must be a string");
  }

  const hash = generateHash(value);

  return {
    id: hash,
    value,
    properties: {
      length: value.length,
      is_palindrome: isPalindrome(value),
      unique_characters: countUniqueCharacters(value),
      word_count: countWords(value),
      sha256_hash: hash,
      character_frequency_map: getCharacterFrequency(value),
    },
    created_at: new Date().toISOString(),
  };
}

module.exports = {
  analyzeString,
  isPalindrome,
  countWords,
  countUniqueCharacters,
  getCharacterFrequency,
  generateHash,
};
