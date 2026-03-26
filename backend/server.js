import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from 'url';
import express from "express";

dotenv.config({ path: ".env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

connectDB();

// Serve static files from fronted folder
app.use(express.static(path.join(__dirname, '../fronted')));

// API routes already mounted in app.js as /api/v1

// Catch-all handler for frontend SPA - serves index.html for client-side routing
// Skip API paths
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../fronted/index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

