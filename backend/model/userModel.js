import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minLength: [3,"enter name with minimum 3 characters"],
        maxLength: [30 ,"enter name with fewer  characters"],
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
        validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minLength: [6, "password must be at least 6 characters long"],
        select: false,
        
    },
    avatar: {
        public_id: {
            type: String,   
            required: true,
        },
        URL: {
            type: String,
            required: true,
        },
    },
    role:{
        type: String,
        default: "user",
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
            
},
 {timestamps: true}
);
// encrypt password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
    
});

userSchema.methods.getJWTToken = function () {
    // Parse JWT_EXPIRE - supports formats like "5d" (days) or plain number
    let expireTime = process.env.JWT_EXPIRE || "5";
    // Extract numeric part if it has suffix like "d", "h", etc.
    const numericPart = parseInt(expireTime.replace(/[^0-9]/g, '')) || 5;
    // Determine the unit and convert to seconds
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: numericPart * 24 * 60 * 60 * 1000 // convert days to milliseconds
    });
    return token;
}
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

userSchema.methods.resetpassword = async function (resetToken) {
    resetToken= crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 2 * 60 * 1000;
    return resetToken;
}
export default mongoose.model("User", userSchema);

