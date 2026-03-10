import express from 'express';
import todo from '../model/todoModel.js';
import { allTodos, createTodo, singleTodo, deleteTodo, toggleTodo } from '../controller/todoController.js';

const router = express.Router();

router.route('/todos').get(allTodos).post(createTodo);

router.route('/todos/:id').get(singleTodo).put(toggleTodo).delete(deleteTodo);

export default router;
