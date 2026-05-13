// filepath: c:\Users\PC\Documents\New folder\E-commerce\backend\routes\userRoutes.js
import express from 'express';
import { loginUser, logoutUser, registerUser, forgotPassword } from '../controller/userController.js';

  // Assuming this exists

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

export default router;
