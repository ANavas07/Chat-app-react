import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversations from "../../zustand/ZConversations";
import UseGetConversations from "../../hooks/UserConversations";
import toast from "react-hot-toast";

export default function SearchInput() {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversations();
    const { conversations } = UseGetConversations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
    }

    const filteredConversations = conversations.filter(c => 
        c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search must be at least 3 characters");
        }

        const conversation = filteredConversations[0]; // Selecciona la primera coincidencia
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            toast.error("No such user found");
        }
    }

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Search...'
                className='input input-bordered rounded-full text-sm md:text-base lg:text-lg w-full sm:w-3/4 lg:w-2/3'
                value={search}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white text-sm sm:text-base lg:text-lg"
            >
                <FaSearch className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 outline-none" />
            </button>

            {/* Mostrar resultados filtrados en tiempo real */}
            {search && filteredConversations.length > 0 && (
                <div className="mt-2 bg-white shadow-md rounded-lg p-4 max-h-60 overflow-y-auto">
                    <ul>
                        {filteredConversations.map((conversation) => (
                            <li
                                key={conversation._id}
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                                onClick={() => setSelectedConversation(conversation)}
                            >
                                {conversation.fullName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    )
}
