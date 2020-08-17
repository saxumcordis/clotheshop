import React, {createContext, useCallback, useContext, useState} from 'react'
import {DrawerContext} from "./Drawer";

export const PathContext = createContext(null);

export const usePath = () => useContext(PathContext);


export const PathProvider = ({children}) => {
    const [path, setPath] = useState('/');
    const value = {path, setPath};

    return <PathContext.Provider value={value}>{children}</PathContext.Provider>
};