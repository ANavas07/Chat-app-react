import { useEffect } from "react";
import useConversations from "../../zustand/ZConversations";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";


export default function MessagesContainer() {
    const {selectedConversation , setSelectedConversation, messages, setMessages} = useConversations();
    //reset when i logout or when i start in the home page
    useEffect(()=>{
        //clean up function
        return ()=>{
            setSelectedConversation(null);
            setMessages([]);
        }
    }, [setSelectedConversation])
    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text">To:</span>{" "}
                        <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}
