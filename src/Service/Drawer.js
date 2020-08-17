import React, {createContext, useCallback, useContext, useState} from 'react'

export const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({children}) => {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState('close');
    const open = useCallback(() => setStatus('open'), [setStatus]);
    const close = useCallback(() => setStatus('close'), [setStatus]);

    const value = {item, setItem, open, status, setStatus, close};

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
};