import app from "./app.js";
import dotenv from "dotenv";//
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config({ path: ".env" });


const PORT = process.env.PORT || 3000;

connectDB();

const MONGODB_URI = process.env.MONGODB_URI;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});   
  