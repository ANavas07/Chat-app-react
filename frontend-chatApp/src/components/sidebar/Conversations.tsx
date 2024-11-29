import UseGetConversations from "../../hooks/UserConversations";
import { UserConversation } from "../../types";
import Conversation from "./Conversation";

export default function Conversations() {
    const {loading, conversations}= UseGetConversations();
    return (
        <div className="py-2 flex flex-col overflow-auto h-[87%]">
            {conversations.map((conversation:UserConversation, index:number)=>{
                return (
                    <Conversation 
                        key={conversation._id}
                        conversation={conversation}
                        lastIndex={index == conversations.length - 1}
                    />
                );
            })}
            {loading ? <span className="loading loading-spinner"></span>: null}
        </div>
    )
}
