import { createContext, useContext, useState } from 'react';
import { UserLocalStorage } from '../types';

/*Global state, concept like to use Zustand*/
type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as any);

//hook
export const useAuthContext = () => {
    // This hook allows any component to access the `authUser` property from the authentication context
    return useContext(AuthContext);
};


export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<UserLocalStorage>(JSON.parse(localStorage.getItem('chat-user') as string) || null);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
};