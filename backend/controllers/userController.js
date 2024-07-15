import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import {jwtDecode} from 'jwt-decode'
//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id, user.name, user.email)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// userController.js


const admin = async (req, res) => {
    const { userId } = req.body; // Get userId from request body

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Update user to have admin role
        user.admin = true;
        await user.save();

        console.log('User is now an admin.');
        return res.status(200).json({ success: true, message: 'User is now an admin.' });
    } catch (error) {
        console.error('Error updating user to admin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};






export {loginUser, registerUser, admin}