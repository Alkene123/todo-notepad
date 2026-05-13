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
    },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
