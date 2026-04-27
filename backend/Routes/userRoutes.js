// filepath: c:\Users\PC\Documents\New folder\E-commerce\backend\routes\userRoutes.js
import express from 'express';
import { loginUser, logoutUser, registerUser, forgotPassword } from '../controller/userController.js';



const router = express.Router();

router.route('api/v1/register').post(registerUser);
router.route('api/v1/login').post(loginUser);
router.route('api/v1/logout').get(logoutUser);

export default router;
