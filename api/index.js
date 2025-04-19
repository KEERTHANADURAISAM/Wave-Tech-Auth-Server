// import required packages

// Web framework for creating APIs.
const express = require('express')
// Loads environment variables from .env file.
const dotenv  = require ('dotenv')
// Helps you connect and interact with MongoDB.
const mongoose = require ('mongoose')
import serverless from 'serverless-http';
const cors = require ('cors')

const PORT = process.env.PORT || 5000;

const authRoutes = require('../Routes/authRoutes.js')

// This line loads variables like MONGO_URI, PORT from .env so you can use them with process.env
dotenv.config();

// create express app
const app = express();

// This line allows your API to read JSON data sent in requests (like in Postman).
app.use(express.json())

app.use(cors());

app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

  app.get('/', (req, res) => {
    res.send('🚀 Wavetech Auth Server is Running!');
  });
  
  app.use((req, res) => {
    console.log(`⚠️ 404 - Route Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
  });

app.listen(PORT,()=>{
    console.log(`Server Running Port ${PORT} Successfully`)
})

export const handler = serverless(app);