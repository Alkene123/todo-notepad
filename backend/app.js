
import express from "express";
import cors from "cors";
import Todo from "./Routes/todoRoutes.js";
import user from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";


const app = express();

app.use(cors({
    origin: '*', // or your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.use(express.json());//middleware to parse json data
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));//middleware to parse urlencoded data


app.use('/api/v1/',Todo);
app.use('/api/v1/',user);

// Register error handling middleware LAST
app.use(errorMiddleware);

export default app;
