
##
A simple but powerful Node.js + Express API that analyzes text strings and stores their computed properties.
Each analyzed string is uniquely identified by a SHA-256 hash, and supports filtering, natural language queries, and deletion.


## Features ##

For each analyzed string, the API computes and stores:
Length ----	Number of characters in the string
is_palindrome ----Boolean —- whether the string reads the same forwards and backwards (case-insensitive)
unique_characters ---- Count of distinct alphanumeric characters
word_count	---- Total number of words separated by whitespace
sha256_hash	---- Secure hash for unique identification
character_frequency_map	---- Object mapping each character to its occurrence count
timestamp	---- Time of creation (ISO format)


## API Endpoints ##

1️⃣ Create / Analyze a New String

POST /api/strings
Analyzes a new string and stores its properties.

2️⃣ Get All Strings (with Optional Filters)

GET /api/strings

3️⃣ Get a String by Value

GET /api/strings/{string_value}


4️⃣ Filter by Natural Language

GET /api/strings/filter-by-natural-language?query=<sentence>

5️⃣ Delete a String

DELETE /api/strings/{string_value}



## 🧰 Technologies Used

Node.js — runtime environment

Express.js — server framework

Crypto — SHA-256 hashing

In-memory Data Store (Map) — lightweight and fast storage


📜 ## License --- MIT License ##


## Developer Notes

This project uses an in-memory store, meaning data resets when the server restarts.

For production use, integrate a persistent store like MongoDB, PostgreSQL, or Redis.

Code follows a modular MVC-like structure for scalability and clarity.


## Local Setup ##

Clone this repository

git clone https://github.com/Reigner007/StringAnalyserService.git
cd StringAnalyserService