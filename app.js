
// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const stringRoutes = require('./routes/stringRoutes');

const app = express();

// ====== Middlewares ======
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log incoming requests

// ====== Routes ======
app.use('/strings', stringRoutes); // Mount our string analyzer routes

// ====== Health Check ======
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the String Analyzer API!',
    endpoints: {
      analyze: 'POST /strings',
      getOne: 'GET /strings/:value',
      getAll: 'GET /strings',
      filterNatural: 'GET /strings/filter-by-natural-language',
      delete: 'DELETE /strings/:value'
    }
  });
});

// ====== 404 Fallback ======
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// ====== Start Server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app; // Export for testing purposes