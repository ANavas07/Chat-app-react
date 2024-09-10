import express, {Application, Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from "http";

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';
import userRoutes from '../routes/user.routes.js';
import connectToMongoDb from '../DB/connectToMongoDb.DB.js';
import SocketServer from '../socket/socket.socket.js';

export default class Server{
    private app:express.Application; 
    private PORT:string;
    private httpServer: http.Server;
    
    constructor(){
        //this.app = express(); //before socket io
        //---app exported from socket io server---
        const socketServer = SocketServer.getInstance();
        this.app= socketServer.getApp();
        this.httpServer=socketServer['httpServer']; //get instance of http server
        //---app exported from socket io server---

        this.PORT= process.env.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen(){
        // this.app.listen(this.PORT, ()=>{  //before socket io
        this.httpServer.listen(this.PORT, ()=>{
            connectToMongoDb();
            console.log("Server running on port "+this.PORT);
        });
    }

    middlewares(){
        this.app.use(express.json());//send data in json format, and the middleware parse it to a js object to use in req.body
        this.app.use(cookieParser());//analize the cookies in the request and parse them to a js object (req.cookies)
        this.app.use(cors({
            credentials: true,
            origin: true,
            allowedHeaders: ["Content-Type"],
        }));
        this.app.disable('x-powered-by');
        this.app.use(this.securityHeaders);
    }

    routes(){
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/messages',messageRoutes);
        this.app.use('/api/users', userRoutes);
    }

    securityHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-src 'none'; object-src 'none'");
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
        next();
    }
}
