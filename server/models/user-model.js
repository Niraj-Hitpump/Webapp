import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
})

// we can use bcrypt to hash password in this section as well which acts as a middleware and function according to the call.

// jsonwentoken
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d", // Fixed the typo here
            }
        );
    } catch (error) {
        console.error("Error generating token:", error.message);
    }
};



const User=mongoose.model('User',userSchema);
export default User