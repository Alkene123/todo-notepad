import express from 'express';
import todo from '../model/todoModel.js';
import { allTodos, createTodo, singleTodo, deleteTodo, toggleTodo } from '../controller/todoController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/todos').get(isAuthenticatedUser, allTodos).post(isAuthenticatedUser, createTodo);

router.route('/todos/:id').get(isAuthenticatedUser, singleTodo).put(isAuthenticatedUser, toggleTodo).delete(isAuthenticatedUser, deleteTodo);

export default router;
