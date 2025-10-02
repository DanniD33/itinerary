const express = require('express');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = 3000;

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: userMessage }]
    });

    res.json({ reply: msg.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with Claude." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
