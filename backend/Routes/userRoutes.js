// filepath: c:\Users\PC\Documents\New folder\E-commerce\backend\routes\userRoutes.js
import express from 'express';
import { loginUser, logoutUser, registerUser, forgotPassword } from '../controller/userController.js';



const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgot-password').post(forgotPassword);

export default router;
