import useConversations from "../../zustand/ZConversations";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

export default function Sidebar() {
    const { selectedConversation } = useConversations();
    return (
        <div className={`${!selectedConversation ? 'block' : 'hidden'} sm:block border-r border-slate-500 p-4 flex flex-col sm:w-full sm:h-full `}>
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations/>
            <LogoutButton />
        </div>
    )
}
