import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversations from "../../zustand/ZConversations";
import UseGetConversations from "../../hooks/UserConversations";
import toast from "react-hot-toast";

export default function SearchInput() {

    const [search, setSearch] = useState('');
    const {setSelectedConversation} = useConversations();
    const {conversations}=UseGetConversations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!search) return;
        if(search.length < 3){
            return toast.error("Search must be at least 3 characters");
        }

        const conversation = conversations.find(c => c.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversation){
            setSelectedConversation(conversation);
            setSearch('');
        }else{
            toast.error("No such user found");
        }
    }

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full'
                value={search}
                onChange={handleChange} />
            <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <FaSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}
