import MessagesContainer from "../../components/messages/MessagesContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversations from "../../zustand/ZConversations";
export default function Home() {
    const { selectedConversation } = useConversations();

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 p-8">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 overflow-y-auto ${selectedConversation ? "hidden md:block md:w-1/3" : "w-full md:w-2/5 lg:w-1/3"
                    }`}
            >
                <Sidebar />
            </div>

            {/* MessagesContainer */}
            <div
                className={`transition-all duration-300 flex-1 ${selectedConversation ? "w-full md:w-2/3 lg:w-2/3" : "hidden md:block"
                    }`}
            >
                <MessagesContainer />
            </div>
        </div>


    );
}
