import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { User } from "../types";

type SocketContextProviderProps = {
    children: React.ReactNode;
};

//here i could pass the type of values that i want to pass [socket, onlineUsers]
export const SocketContext = createContext({} as any);

//hook
export const useSocketContext =() =>{
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            //Communicate with the server
            const socket = io("http://localhost:3001",{
                query:{
                    userId:authUser._id, //key:value
                }
            });
            setSocket(socket);
            //To see who is online
            socket.on('getOnlineUsers',(usersOnline:User[])=>{
                setOnlineUsers(usersOnline);
            });

            return () => {
                socket.close();
            }
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>);
};