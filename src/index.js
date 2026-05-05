import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Jarvis is ready to assist you, sir.',
    timestamp: new Date().toISOString()
  });
});

// Welcome endpoint
app.get('/api/welcome', (req, res) => {
  res.json({
    greeting: 'Good morning. I am Jarvis, your AI Assistant.',
    features: [
      'Music Playback',
      'Voice Commands',
      'AI Conversations',
      'Task Management'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎩 Jarvis is now online on port ${PORT}`);
  console.log(`🌐 Visit http://localhost:${PORT} to interact with Jarvis`);
});
