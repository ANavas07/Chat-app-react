import { useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext();

    //Function to logout
    const logout = async () => {
        setLoading(true);
        try{
            const res = await fetch(`${API_BASE_URL}auth/logout`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem('chat-user');
            setAuthUser(null);
            
        }catch(error){
            toast.error(error as string);
        }finally{
            setLoading(false);
        }
    }
    //Return loading and logout function
    return{
        loading,
        logout,
    }
};