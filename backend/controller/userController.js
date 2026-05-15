import User from '../model/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

export const registerUser = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        console.log('Register attempt:', { name, email });
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }
        
        // Check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: 'sample_id',
                URL: 'sample_url',
            },
        });
        
        const token = generateToken(user._id);
        
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch(error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt:', { email });
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
        const token = generateToken(user._id);
        
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch(error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logoutUser = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "User logged out"
    });
}

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};