import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";


dotenv.config();

// Log to verify URI is loaded
console.log("MONGO_URI exists?", !!process.env.MONGO_URI);

if (process.env.MONGO_URI) {
    const maskedUri = process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@');
    console.log("Using URI:", maskedUri);
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database ready, starting server...");
        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();