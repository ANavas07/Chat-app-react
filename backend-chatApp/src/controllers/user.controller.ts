import {Request, Response} from 'express';
import { ErrorMessages } from '../error/errorMessages.error.js';
import User from '../models/user.model.js';

export const getUsersForSidebar= async(req:Request, res:Response)=>{
    try{
        const loggedInUserID= req.user?._id;    
        const allUsers = await User.find({_id:{$ne:loggedInUserID}}).select('userName');
        if(!allUsers) res.status(200).json([]);
        res.status(200).json(allUsers);

    }catch(error){
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
}