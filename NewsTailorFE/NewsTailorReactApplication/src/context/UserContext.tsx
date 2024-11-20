import React, {createContext, ReactNode, useEffect, useState} from "react";
import {USER_INFO} from "../constants.ts";

interface UserState {
    id: number | null;
    username: string | null;
    email: string | null;
}

interface UserContextType {
    user: UserState;
    setUser: (user: UserState) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserState>({
        id: null,
        username: null,
        email: null,
    });

    // Load user data from localStorage on app load
    useEffect(() => {
        const userData = localStorage.getItem(USER_INFO);
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser({
                id: parsedUserData.id,
                username: parsedUserData.username,
                email: parsedUserData.email,
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};