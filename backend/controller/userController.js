import User from '../model/userModel.js'
import {sendToken} from '../helper/jwttoken.js'
import bcrypt from 'bcrypt';
import HandleError from '../helper/errHandling.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

export const registerUser = async(req, res, next)=>{
 try{
   const {name,email,password}=req.body;
   
   if(!name || !email || !password){
       return res.status(400).json({
           success:false,
           message:"Please provide all fields"
       })
   }
   
   // Check if user already exists
   const oldUser = await User.findOne({email});
   if(oldUser){
       return res.status(400).json({
           success:false,
           message:"User already exists"
       })
   }
   
   const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'sample_id',
            URL:'sample_url',
        },
        
    });
    // if (user) {
    //         res.status(201).json({
    //             success: true,
    //             message: 'Registration successful',
    //             token: generateToken(user._id),
    //             user: {
    //                 id: user._id,
    //                 name: user.name,
    //                 email: user.email
    //             }
    //         });
    //     }
    
    return sendToken(user, 201, res)
      

}catch(error){
    console.log('Error caught:', error.message);
    next(error);
};

}

export const loginUser= async (req, res, next)=>{
    try{
        const {email, password}=req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide email and password"
        })
    }
     const user =await User.findOne({email}).select('+password');
     
     if(!user){
         return next(new HandleError("Invalid email or password", 401))
     }
     
    
     const isMatch = await bcrypt.compare(password, user.password);
     
     if(!isMatch){
         return next(new HandleError("Email or password does not exist", 401))
     }
        //  return res.status(200).json({
        //     success: true,
        //     message: 'Login successful',
        //     token: generateToken(user._id),
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email
        //     }
        // });
    return sendToken(user,200,res)
    
    }catch(error){
        console.log(error.message);
        next(error);   
    }
}
export const logoutUser= async (req, res, next)=>{
    const option={
        http:true,
        expires: new Date(Date.now()),
    };
    res.cookie('token',null,option)
    return  res.status(200).json({
        success:true,
        message:"user just logged out"
    })
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
        // For now, just return a success message
        // In production, you would implement token generation and email sending
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

