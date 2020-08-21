import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {useCart} from "./CartContext";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : 'guest');
    const [stageStatus, setStageStatus] = useState(0);
    const login = useCallback((user) => setUser(user), [setUser]);
    const logout = useCallback(() => setUser('guest'), [setUser]);
    const [stage, setStage] = useState('login');

    const value = {login, logout, user, setUser, stage, setStage, stageStatus, setStageStatus};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export const PersistUser = () => {
    const {user} = useUser();
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user]);

    return <></>
};