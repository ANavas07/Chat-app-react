import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.utils.js';
import { ErrorMessages } from '../error/errorMessages.error.js';


export const signupUser = async (req: Request, res: Response) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: ErrorMessages.COMPARE_PASSWORD
            })
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({
                error: ErrorMessages.EXISTING_USERNAME
            })
        }

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic: String = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic: String = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        //Hash password here --salt is 12
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id, // _id is the id that mongoDB generates for each document
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: ErrorMessages.INVALID_USER_DATA });
        }
    } catch (error) {
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        })
    }
}
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const user= await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({
                error: ErrorMessages.INVALID_CREDENTIALS
            })
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    } catch (error) {
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        })
    }
}



export const logoutUser = async (req: Request, res:Response) => {
    try{
        res.cookie('jwt', '', {maxAge: 0});
        // res.clearCookie('jwt');
        res.status(200).json({
            message: ErrorMessages.SUCCESSFULLY_LOGGED_OUT
        })
    }catch(error){
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        })
    }
}

