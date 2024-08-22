import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';

const generateTokenAndSetCookie = (userID: Types.ObjectId, res: Response) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET as string, { expiresIn: '10d' });
    res.cookie('jwt', token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, //expires in 10 days
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks,
        secure: process.env.NODE_ENV !== 'development' //takes https protocol instead of http
    });
};

export default generateTokenAndSetCookie;

