import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import { verifyError } from "../helpers/VerifyErrors";
import toast from "react-hot-toast";
import { UserConversation } from "../types";

const UseGetConversations = () => {
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState<UserConversation[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res=await fetch(`${API_BASE_URL}users`,{
                    // mode: "no-cors",
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(verifyError(error));
            }finally{
                setLoading(false);
            }
        };
        getConversations();
    },[]);

    return{
        loading,
        conversations,
    }
};

export default UseGetConversations;
