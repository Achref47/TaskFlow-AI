const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

// Ensure GEMINI_API_KEY is available
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is missing in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post('/', async (req, res) => {
  const { message } = req.body;
  const authHeader = req.headers.authorization;

  // Validate message
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Validate auth header
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Generate AI response
    const result = await model.generateContent(message);
    const botResponse = result.response.text();

    // Respond to user
    res.status(200).json({ botResponse });

    // Save history in background (non-blocking)
    try {
      await pool.execute(
        `INSERT INTO chatbot_history (user_id, user_message, chatbot_response) 
         VALUES (?, ?, ?)`,
        [userId, message, botResponse]
      );
      console.log('✅ Chat history saved successfully.');
    } catch (dbError) {
      console.error('❌ Error saving chatbot history:', dbError);
    }
  } catch (error) {
    // Handle JWT errors specifically
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
    }

    console.error('❌ Error with chatbot interaction:', error);
    res.status(500).json({ error: 'Failed to get a response from the chatbot.' });
  }
});

module.exports = router;
