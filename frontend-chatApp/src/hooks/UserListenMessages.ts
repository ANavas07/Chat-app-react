import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversations from "../zustand/ZConversations";
import { Message} from "../types";
import notificationSound from '../assets/sounds/level-up-191997.mp3';

export default function UserListenMessages() {
    const {socket} = useSocketContext();
    const {messages,setMessages}=useConversations();

    useEffect(()=>{
        socket.on('newMessage',(newMessage:Message)=>{
            newMessage.shouldShake=true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        });

        return ()=>{
            socket?.off('newMessage');
        };
    },[socket,messages, setMessages]);

}
