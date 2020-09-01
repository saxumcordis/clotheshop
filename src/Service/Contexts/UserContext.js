import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {useCart} from "./CartContext";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : 'guest');
    const [isAdmin, setAdmin] = useState(localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : 0);
    const [personal, setPersonal] = useState(localStorage.getItem('personal') ? JSON.parse(localStorage.getItem('personal')) : []);
    const [stageStatus, setStageStatus] = useState(0);
    const logout = useCallback(() => {localStorage.removeItem('user'); localStorage.removeItem('personal')}, [setUser]);
    const [stage, setStage] = useState('login');

    const value = {logout, user, setUser, stage, setStage, stageStatus, setStageStatus, personal, setPersonal, isAdmin, setAdmin};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export const PersistUser = () => {
    const {user, isAdmin} = useUser();
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('admin', JSON.stringify(isAdmin));
    }, [user, isAdmin]);

    return <></>
};