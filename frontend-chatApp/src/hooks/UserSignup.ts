import { useState } from "react";
import toast from "react-hot-toast";

import { UserSignUp } from "../types";
import { API_BASE_URL } from "../helpers/Constants";
import {useAuthContext} from "../context/AuthContext";
import { verifyError } from "../helpers/VerifyErrors";

export default function UserSignup() {

    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser}=useAuthContext();

    const signup = async(user:UserSignUp) =>{
        const success = handleInputErrors(user);
        if(!success) return;
        setLoading(true);
        try{
            const res:Response = await fetch(`${API_BASE_URL}auth/signup`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials:"include",//establish and admit access to the cookies
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            //localStorage
            localStorage.setItem('chat-user', JSON.stringify(data));
            //context (update)
            setAuthUser(data);
        }catch(error){
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    };


    return{
        loading,    
        signup,
    };
}

const handleInputErrors= (user:UserSignUp):boolean=>{
    const {fullName, userName, password, confirmPassword, gender} = user;
    if(!fullName|| !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields.")
        return false;
    }
    
    if(password !== confirmPassword){
        toast.error("Passwords don't match.")
        return false;
    }

    if(password.length < 6){
        toast.error("Password should be at least 6 characters long.")
        return false;
    }
    return true;
}