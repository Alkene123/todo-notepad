import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Add these event listeners BEFORE connecting
        mongoose.connection.on('connecting', () => {
            console.log('🟡 Mongoose: Connecting to MongoDB...');
        });
        
        mongoose.connection.on('connected', () => {
            console.log('🟢 Mongoose: Connected successfully');
        });
        
        mongoose.connection.on('error', (err) => {
            console.log('🔴 Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚪ Mongoose: Disconnected');
        });
        
        // Add timeout options to diagnose faster
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,  // Fail faster for diagnosis
            connectTimeoutMS: 10000,
        });
        
        console.log("✅ MongoDB connected. ReadyState:", mongoose.connection.readyState);
    } catch (error) {
        console.log("❌ Connection error:", error.message);
        // Don't exit immediately - let's see the error first
        throw error;
    }
};