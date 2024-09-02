import { useState } from "react";
import useConversations from "../zustand/ZConversations";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";
import {sendMessage } from "../types";

const userSendMessage=()=>{
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} =  useConversations();

    const sendMessage= async(message:sendMessage)=>{
        setLoading(true);
        try{
            const res=await fetch(`${API_BASE_URL}messages/send/${selectedConversation?._id}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify(message),
            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
        }catch(error){
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    }

    return {sendMessage, loading};
}


export default userSendMessage;