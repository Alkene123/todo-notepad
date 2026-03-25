import HandleError from "../helper/errHandling.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    //Duplicate key error
    if (err.code === 11000) {
        const message = "Email already exists";
        err = new HandleError(message, 400);
    }
    
    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message).join(', ');
        err = new HandleError(message, 400);
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
