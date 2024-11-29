import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useConversations from "../../zustand/ZConversations";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    const { selectedConversation, setSelectedConversation } = useConversations();
    const [search, setSearch] = useState('');

    return (
        <div className="border-b md:border-b-0 md:border-r border-slate-500 p-4 flex flex-col overflow-y-auto bg-gray-700">
            {!selectedConversation ? (
                <>
                    <SearchInput search={search} setSearch={setSearch} />
                    <div className="divider px-3"></div>
                    <div className="flex-grow overflow-y-auto">
                        <Conversations search={search} />
                    </div>
                    <LogoutButton />
                </>
            ) : (
                <div className="flex items-center">
                    <button
                        onClick={() => setSelectedConversation(null)}
                        className="mr-2 text-gray-200 hover:text-gray-400"
                    >
                        <AiOutlineArrowLeft size={20} />
                    </button>
                    <span className="text-gray-200 font-bold">Volver</span>
                </div>
            )}
        </div>
    );
}
