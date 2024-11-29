import { BsSend } from "react-icons/bs"
import { Message } from "../../types"
import { useState } from "react";
import userSendMessage from "../../hooks/UserSendMessage";

const initialState: Message={
    _id: "",
    senderID: "",
    receiverID: "",
    message: "",
    createdAt:"",
    shouldShake: false
}

export default function MessageInput() {

    const [message, setMessage] = useState<Message>(initialState);
    const {loading, sendMessage} = userSendMessage();

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setMessage({
            ...message,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit= async (e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!message.message) return;
        await sendMessage(message);
        setMessage(initialState);
    }

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text"
                className="border text-sm rounded-lg block w-full p-2.5
                bg-gray-700 border-gray-600 text-white"
                placeholder="Send a message"
                id="message"
                value={message.message}
                onChange={handleChange}/>
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                {loading ? <span className="loading loading-spinner"></span>: <BsSend className="text-gray-500 hover:text-sky-400"/>}
                </button>
            </div>
        </form>
    )
}
