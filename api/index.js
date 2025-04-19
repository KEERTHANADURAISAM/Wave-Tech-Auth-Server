// Web framework for creating APIs.
const express = require('express');
// Loads environment variables from .env file.
const dotenv = require('dotenv');
// Helps you connect and interact with MongoDB.
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // ✅ use require here
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes.js');

dotenv.config();

// create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Wavetech Auth Server is Running!');
});

// 404 route
app.use((req, res) => {
  console.log(`⚠️ 404 - Route Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// ❌ DO NOT USE app.listen() in serverless functions
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
