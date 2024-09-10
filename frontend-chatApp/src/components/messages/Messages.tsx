import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/UserGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import UserListenMessages from "../../hooks/UserListenMessages";

export default function Messages() {
    const { loading, messages } = useGetMessages();
    UserListenMessages();
    //authomatically scroll to the bottom of the messages
    const lastMessageRef= useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behavior:'smooth'});
        },100)
    },[messages]);

    return (
        //overflow-auto: The overflow-auto utility sets the overflow property to auto. It adds a scrollbar to the element if the content is overflowing the box.
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messages.length > 0 &&
                messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message}/>
                </div>
                ))}

            {/* if it is loading, show 3 skeleton messages */}
            {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}
            {!loading && messages.length === 0 && <p className="text-center text-gray-200">Send a message to start the conversation</p>}
            {/* <Message/> */}
        </div>
    )
}
