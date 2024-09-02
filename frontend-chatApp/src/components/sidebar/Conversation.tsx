import {UserConversation } from "../../types"
import useConversations from "../../zustand/ZConversations"

type FormPropsConversation={
    conversation: UserConversation,
    lastIndex:boolean
}

export default function Conversation({conversation, lastIndex}:FormPropsConversation) { 
    //when i click in a conversation i want to set the conversation into an special color
    const {selectedConversation, setSelectedConversation}=useConversations()
    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500":""}`}
            onClick={()=> setSelectedConversation(conversation)}>
                <div className="avatar offline">
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user Avatar"/>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{conversation.fullName}</p>
                    <span className="text-xl">🛫</span>
                </div>
                </div>
            </div>
            {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
            
        </>
    )
}
