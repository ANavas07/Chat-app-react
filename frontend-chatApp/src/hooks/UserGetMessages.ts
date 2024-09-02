import { useEffect, useState } from "react";
import useConversations from "../zustand/ZConversations";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

const useGetMessages = () => {
    const [loading, setLoading] = useState(true);
    const { messages, setMessages, selectedConversation } = useConversations();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}messages/${selectedConversation?._id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(verifyError(error));
            } finally {
                setLoading(false);
            }
        };

        //do it if we have a selected conversation
        if(selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return {
        loading,
        messages,
    }
}

export default useGetMessages;