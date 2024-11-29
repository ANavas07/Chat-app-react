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
        <div className="md:min-w-[450px] flex flex-col sm:w-full">
            {!selectedConversation ? (
            <NoChatSelected />
            ) : (
            <>
            <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center">
            <button className="mr-2 sm:block md:hidden" onClick={() => setSelectedConversation(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
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
