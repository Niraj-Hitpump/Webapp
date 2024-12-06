import e from "express";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";


export const home = (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to the home page" });
    } catch (error) {
        console.log(error.message);
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        // Hash the password
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password: hash_password,
        });

        res.status(201).json({
            message: "User created successfully",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
       console.log(error,"Internal server error");
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({ message: "User does not exist" });
        }
        const user = await bcrypt.compare(password, userExist.password);
        if(user){
            res.status(200).json({
                message: "User logged in successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else{
            res.status(400).json({message:"Invalid credentials"});
        }
    } catch (error) {
        res.status(500).json({ "Internal Server Error": error.message });
    }
}


// user logic to send user data 
export const user = async (req, res) => {
    try {
        const userData=req.user;
        console.log(userData); 
        res.status(200).json({userData});
    } catch (error) {
        console.log(error,"Error fromt he user route");
    }
}


// steps:-
// Get Registration Data
// check email existence
// hash password
// create User
// save to db
// respond

// authentication:-veryfying the identity of a user or client.
// authorization:- determing what actions a user or client is allowed to performance.
