import { useAuthContext } from "../../context/AuthContext"
import extractTime from "../../helpers/ExtractTime";
import { Message } from "../../types"
import useConversations from "../../zustand/ZConversations";

type FormPropsMessage={
    message:Message
}

export default function MessageC({message}:FormPropsMessage) {
    const {authUser} = useAuthContext();
    const {selectedConversation}= useConversations();
    const fromMe = message.senderID === authUser?._id;
    const formattedTime= extractTime(message.createdAt);
    const chatClassing = fromMe ? "chat chat-start" : "chat chat-end";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const bubbleColor = fromMe ? "bg-sky-500" : "bg-gray-800";

    return (
        <div className={chatClassing}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Profile picture"
                        src={profilePic} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">{formattedTime}</time>
            </div>
            <div className={`chat-bubble ${bubbleColor} text-white`}>{message.message}</div>
        </div>
    )
}
