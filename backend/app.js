
import express from "express";
import cors from "cors";
import Todo from "./Routes/todoRoutes.js";
import user from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";


const app = express();
const allowedOrigins = [
    'https://todo-notepad-frontend.vercel.app',  // Correct Vercel domain
    'http://localhost:3000',  // Local development
    'http://localhost:5500',   // Another local port
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    optionsSuccessStatus: 200
})); // Enable CORS for all routes
app.use(express.json());//middleware to parse json data
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));//middleware to parse urlencoded data


app.use('/api/v1/',Todo);
app.use('/api/v1/',user);          

app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: `Cannot ${req.method} ${req.originalUrl}` 
    });
});              

export default app;
