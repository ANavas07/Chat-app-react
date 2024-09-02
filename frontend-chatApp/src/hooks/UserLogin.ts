import toast from "react-hot-toast";

import { useState } from "react";
import { UserLoginT } from "../types";
import { useAuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../helpers/Constants";
import { verifyError } from "../helpers/VerifyErrors";

export default function UserLogin() {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (user: UserLoginT) => {
        const success = handleInputErrors(user);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",//establish and admit access to the cookies
                body: JSON.stringify(user),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem('chat-user', JSON.stringify(data));
            //with this i can move from login to chat
            setAuthUser(data);
        } catch (error) {
            toast.error(verifyError(error));
        } finally {
            setLoading(false);
        };
    }

    return { login, loading };
};

const handleInputErrors = (user: UserLoginT): boolean => {
    const { userName, password } = user;
    if (!userName || !password) {
        toast.error("Please fill in all fields.");
        return false;
    }
    return true;
};