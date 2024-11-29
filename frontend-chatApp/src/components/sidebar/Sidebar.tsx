import { useState } from "react";
import useConversations from "../../zustand/ZConversations";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    const { selectedConversation } = useConversations();
    const [search, setSearch] = useState('');
    return (
        <div className={`${!selectedConversation ? 'block' : 'hidden'} sm:block border-r border-slate-500 p-4 flex flex-col sm:w-full sm:h-full `}>
            <SearchInput search={search} setSearch={setSearch} />
            <div className="divider px-3"></div>
            <Conversations search={search} />
            <LogoutButton />
        </div>
    )
}
