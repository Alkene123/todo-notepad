import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;

// ✅ Wrap in an async function and await the connection
const startServer = async () => {
    try {
        await connectDB();  // Wait for database connection
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();