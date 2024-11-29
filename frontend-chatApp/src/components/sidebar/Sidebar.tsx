import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useConversations from "../../zustand/ZConversations";

export default function Sidebar() {
    const { selectedConversation, setSelectedConversation } = useConversations();

    return (
        <div className="border-b md:border-b-0 md:border-r border-slate-500 p-4 flex flex-col overflow-y-auto bg-gray-700">
            {!selectedConversation ? (
                <>
                    <SearchInput />
                    <div className="divider px-3"></div>
                    <div className="flex-grow overflow-y-auto">
                        <Conversations />
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
                    <span className="text-gray-200 font-bold">
                        Volver
                    </span>
                </div>
            )}
        </div>
    );
}
