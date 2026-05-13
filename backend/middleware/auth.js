import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header (Bearer token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }
        // Also check cookies
        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access this resource'
            });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        req.user = await User.findById(decodedData._id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

