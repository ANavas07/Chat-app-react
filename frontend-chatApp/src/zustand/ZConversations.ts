import { create } from "zustand";
import { ConversationsStateZustand} from "../types";


const useConversations = create<ConversationsStateZustand>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation}),
    messages:[],
    setMessages:(messages:any) => set({messages}),
}));

export default useConversations;