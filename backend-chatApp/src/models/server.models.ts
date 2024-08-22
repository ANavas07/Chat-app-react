import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';
import userRoutes from '../routes/user.routes.js';
import connectToMongoDb from '../DB/connectToMongoDb.DB.js';

export default class Server{
    private app:express.Application; 
    private PORT:string;
    
    constructor(){
        this.app = express();
        this.PORT= process.env.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.PORT, ()=>{
            connectToMongoDb();
            console.log("Server running on port "+this.PORT);
        });
    }

    middlewares(){
        this.app.use(express.json());//send data in json format, and the middleware parse it to a js object to use in req.body
        this.app.use(cookieParser());//analize the cookies in the request and parse them to a js object (req.cookies)
    }

    routes(){
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/messages',messageRoutes);
        this.app.use('/api/users', userRoutes);
    }
}
