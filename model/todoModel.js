import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,   
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
