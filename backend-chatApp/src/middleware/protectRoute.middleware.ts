import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ErrorMessages } from '../error/errorMessages.error.js';
import User from "../models/user.model.js";

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                error: ErrorMessages.UNAUTHORIZED
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return res.status(401).json({
                error: ErrorMessages.INVALID_TOKEN
            });
        }

        //verify if decoded is type of JwtPayload
        if (typeof decoded === 'object' && 'userID' in decoded) {
            const user = await User.findById(decoded.userID).select('-password');

            if (!user) {
                return res.status(404).json({
                    error: ErrorMessages.USER_NOT_FOUND
                });
            }
            //add user to req object (_id)
            req.user = user;
            next();
        }else{
            res.status(500).json({
                error: ErrorMessages.INTERNAL_SERVER_ERROR
            });
        }

    } catch (error) {
        console.log("error in protectRoute middleware: ", error);
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
}

export default protectRoute;