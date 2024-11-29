import { useState, useEffect } from "react";
import UseGetConversations from "../../hooks/UserConversations";
import { UserConversation } from "../../types";
import Conversation from "./Conversation";

export default function Conversations({ search }: { search: string }) {
    const { loading, conversations } = UseGetConversations();
    const [filteredConversations, setFilteredConversations] = useState<UserConversation[]>([]);

    // Filtrar las conversaciones según el texto de búsqueda
    useEffect(() => {
        if (search) {
            setFilteredConversations(
                conversations.filter(c => c.fullName.toLowerCase().includes(search.toLowerCase()))
            );
        } else {
            setFilteredConversations(conversations);
        }
    }, [search, conversations]);

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {filteredConversations.map((conversation: UserConversation, index: number) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIndex={index === filteredConversations.length - 1}
                />
            ))}
            {loading ? <span className="loading loading-spinner"></span> : null}
        </div>
    );
}
