import { useEffect } from "react";
import useConversations from "../../zustand/ZConversations";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function MessagesContainer() {
    const { selectedConversation, setSelectedConversation, setMessages } = useConversations();

    useEffect(() => {
        return () => {
            setMessages([]);
        };
    }, [setMessages]);

    return (
        <div className="flex-1 flex flex-col">
    {!selectedConversation ? (
        <NoChatSelected />
    ) : (
        <>
            {/* Cabecera de la conversación */}
            <div className="bg-gray-800 px-4 py-2 mb-2 flex items-center">
                <button
                    onClick={() => setSelectedConversation(null)}
                    className="mr-2 text-gray-100 hover:text-gray-400 flex items-center md:hidden"
                >
                    <AiOutlineArrowLeft size={20} />
                    <span className="ml-2">Volver</span>
                </button>
                <span className="text-gray-100 font-bold">{selectedConversation.fullName}</span>
            </div>

            {/* Mensajes */}
            <Messages />

            {/* Input de mensaje */}
            <MessageInput />
        </>
    )}
</div>

    );
}
