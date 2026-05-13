

import express from "express";
import cors from "cors";
import Todo from "./Routes/todoRoutes.js";
import user from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());//middleware to parse json data
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));//middleware to parse urlencoded data


app.use('/api/v1/',Todo);
app.use('/api/v1/',user);                        

export default app;
