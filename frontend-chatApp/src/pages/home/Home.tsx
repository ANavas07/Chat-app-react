import MessagesContainer from "../../components/messages/MessagesContainer";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {

    return (
        <div className="flex flex-col h-[90%] sm:flex-row sm:h-[90%] md:h-[90%] rounded-lg overflow-hidden 
        bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
            <Sidebar/>
            <MessagesContainer  />
        </div>
    )
}
