import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variables

app.use(cors());
app.use(express.json());

// Store payment details in memory (use a database in production)
const payments = new Map();

// API Routes
app.post('/api/payments', (req, res) => {
  const apiKey = req.headers.authentication?.split(' ')[1];
  const callbackUrl = req.headers.callbackurl;

  if (!apiKey || !callbackUrl) {
    return res.status(400).json({ error: 'Missing required headers' });
  }

  const paymentData = req.body;
  const token = jwt.sign({ 
    paymentId: paymentData.Data.Initiation.InstructionIdentification 
  }, JWT_SECRET);

  payments.set(token, {
    paymentData,
    callbackUrl
  });

  const redirectUrl = `http://localhost:${PORT}/login?token=${token}`;
  res.json({ redirectUrl });
});

app.get('/api/payment/:token', (req, res) => {
  const { token } = req.params;
  const payment = payments.get(token);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  res.json(payment);
});

// Serve Vite app in development
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);
} else {
  // Serve production build
  app.use(express.static(join(__dirname, '../dist')));
}

// Handle client-side routing
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(join(__dirname, '../dist/index.html'));
  } else {
    res.sendFile(join(__dirname, '../index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});