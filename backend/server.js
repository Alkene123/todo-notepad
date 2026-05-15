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

// Note: when deploying frontend separately to Vercel, do not rely on serving static files from backend.
// Keeping backend focused on API endpoints.


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

