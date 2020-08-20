import React, {createContext, useCallback, useContext, useState} from 'react'

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState('guest');
    const [registerStatus, setRegisterStatus] = useState(0);
    const login = useCallback(() => setUser('member'), [setUser]);
    const logout = useCallback(() => setUser('guest'), [setUser]);
    const [stage, setStage] = useState('login');

    const value = {login, logout, user, stage, setStage, registerStatus, setRegisterStatus};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};