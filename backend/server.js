import app from "./app.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config({ path: ".env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

connectDB();

// app.use(express.static(path.join(__dirname, '../frontend')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../fronted/login.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/login.html'));
// });
app.get('/', (req, res) => {
    res.json({ 
        status: "Backend is running!",
        message: "API is live. Frontend files not yet deployed.",
        endpoints: {
            "GET /api/notes": "Get all notes",
            "POST /api/notes": "Create a note",
            // Add your other endpoints here
        }
    });
});
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
