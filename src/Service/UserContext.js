import React, {createContext, useCallback, useContext, useState} from 'react'

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState('guest');
    const login = useCallback(() => setUser('member'), [setUser]);
    const logout = useCallback(() => setUser('guest'), [setUser]);
    const [stage, setStage] = useState('register');

    const value = {login, logout, user, stage, setStage};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};