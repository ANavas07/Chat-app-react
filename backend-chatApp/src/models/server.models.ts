import express, {Application, Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from "http";

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';
import userRoutes from '../routes/user.routes.js';
import connectToMongoDb from '../DB/connectToMongoDb.DB.js';
import SocketServer from '../socket/socket.socket.js';
import { ErrorMessages } from '../error/errorMessages.error.js';
import { createState, generateRoundKeys } from '../services/encrypt.services.js';
import KeyManager from '../services/keyManager.services.js';

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
        this.initializeAesKeys();
        this.listen();
        this.middlewares();
        this.routes();
    };

    async initializeAesKeys(){
        try{
            const aesKey:string= process.env.AES_KEY!;
            if(!aesKey || aesKey.length<16){
                throw new Error(ErrorMessages.INVALID_AES_KEY);
            }

            const keyManager = KeyManager.getInstance();    

            //Matriz de estado de la clave
            const keyState = createState(aesKey);
            //Rondas de clave se usan para encriptar y desencriptar por eso la guardo en memoria
            const roundKeys = generateRoundKeys(keyState);
            //Almaceno roundKeys en memoria
            keyManager.setKey(roundKeys);
        }catch(error){
            console.log(error);
        }
    };

    listen(){
        // this.app.listen(this.PORT, ()=>{  //before socket io
        this.httpServer.listen(this.PORT, ()=>{
            connectToMongoDb();
            console.log("Server running on port "+this.PORT);
        });
    };

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
    };

    routes(){
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/messages',messageRoutes);
        this.app.use('/api/users', userRoutes);
    };

    securityHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-src 'none'; object-src 'none'");
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
        next();
    };
}
