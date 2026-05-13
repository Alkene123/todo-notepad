class HandleError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.name = "HandleError";
        this.isOperational = true; // Helps distinguish operational errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export default HandleError;