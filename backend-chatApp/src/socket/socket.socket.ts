import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketMap } from "../types/index.js";
import Message from "../models/message.model.js";


export default class SocketServer {

    private static instance:SocketServer | null = null;
    private app: express.Application;
    private httpServer: http.Server;
    private io: Server;
    //Listen for connections---------------------
    private userSocketMap: socketMap = {};  //key => userId, value => socketId

    private constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true,
                allowedHeaders: ["Content-Type"],
            }
        });
        this.setupSocketListeners();
    }

    public static getInstance(): SocketServer{
        if(!SocketServer.instance){
            SocketServer.instance = new SocketServer();
        }
        return SocketServer.instance;
    }

    private setupSocketListeners() {
        //socket => the client that connected
        this.io.on('connection', (socket) => {
            console.log("user connected", socket.id);
            const userId: string = socket.handshake.query.userId as string;
            if (userId != "undefined") this.userSocketMap[userId] = socket.id;
            //io.emit() is used to send the message to all the connected clients
            this.io.emit('getOnlineUsers', Object.keys(this.userSocketMap));

            //socket.on() is uses to listen to the events, can be used both on client and server side
            socket.on('disconnect', () => {
                console.log("user disconnected", socket.id);
                delete this.userSocketMap[userId];
                this.io.emit('getOnlineUsers', Object.keys(this.userSocketMap));
            });
        });
    }

    public sendMessageToUser = (receiverID:string, message: any) =>{
        const receiverSocketID= this.getReceiverSocketId(receiverID);
        if(receiverSocketID){
            this.io.to(receiverSocketID).emit('newMessage', message);
        }
    }

    //Comunication in real time
    public getReceiverSocketId = (receiverId: string) => {
        return this.userSocketMap[receiverId];
    }

    public getApp(): express.Application {
        return this.app;
    }

}
