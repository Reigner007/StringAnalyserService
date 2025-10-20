const crypto = require('crypto');

/**
 * 🔹 Check if a string is a palindrome
 * @param {string} str 
 * @returns {boolean}
 */
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

/**
 * 🔹 Count how many words are in a string
 * @param {string} str 
 * @returns {number}
 */
function countWords(str) {
  const words = str.trim().split(/\s+/);
  return str.trim() === '' ? 0 : words.length;
}

/**
 * 🔹 Count how many vowels are in a string
 * @param {string} str 
 * @returns {number}
 */
function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

/**
 * 🔹 Get character frequency (e.g., { a: 2, b: 1 })
 * @param {string} str 
 * @returns {object}
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
 * 🔹 Count distinct (unique) characters
 * @param {string} str 
 * @returns {number}
 */
function countUniqueCharacters(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return new Set(clean).size;
}

/**
 * 🔹 Generate a SHA-256 hash for unique identification
 * @param {string} str 
 * @returns {string}
 */
function generateHash(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * 🔹 Analyze a string and return computed properties
 * @param {string} value 
 * @returns {object}
 */
function analyzeString(value) {
  return {
    value,
    length: value.length,
    word_count: countWords(value),
    is_palindrome: isPalindrome(value),
    unique_characters: countUniqueCharacters(value),
    vowel_count: countVowels(value),
    character_frequency_map: getCharacterFrequency(value),
    sha256_hash: generateHash(value),
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  analyzeString,
  isPalindrome,
  countWords,
  countVowels,
  getCharacterFrequency,
  countUniqueCharacters,
  generateHash
};
