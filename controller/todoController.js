import Todo from '../model/todoModel.js';

// Get all todos
export const allTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            todos
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch todos', 
            error: error.message 
        });
    }
};

// Create a new todo
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = await Todo.create({ 
            title: title || description,
            text: description || ''
        });
        res.status(201).json({
            success: true,
            todo: newTodo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create todo', 
            error: error.message 
        });
    }
};

// Get single todo by ID
export const singleTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ 
                success: false, 
                message: 'Todo not found' 
            });
        }
        res.status(200).json({
            success: true,
            todo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch todo', 
            error: error.message 
        });
    }
};

// Delete a todo by ID
export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ 
                success: false, 
                message: 'Todo not found' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Todo deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete todo', 
            error: error.message 
        });
    }
};

// Toggle todo completion
export const toggleTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({ 
                success: false, 
                message: 'Todo not found' 
            });
        }
        
        todo.completed = !todo.completed;
        await todo.save();
        
        res.status(200).json({
            success: true,
            todo
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to toggle todo', 
            error: error.message 
        });
    }
};
