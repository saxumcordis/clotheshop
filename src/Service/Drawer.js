import React, {createContext, useCallback, useContext, useState} from 'react'

export const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({children}) => {
    const [warning, setWarning] = useState(false);
    const [status, setStatus] = useState('close');
    const [component, setComponent] = useState(null);
    const [componentName, setComponentName] = useState(null);
    const open = useCallback(() => setStatus('open'), [setStatus]);
    const close = useCallback(() => setStatus('close'), [setStatus]);
    const setComponentRender = useCallback((component) => setComponent(component), [setStatus]);
    const showWarning = useCallback(() => {
        setWarning(true);
        setTimeout(() => setWarning(false), 3500)
    }, [setStatus]);

    const value = {warning, showWarning, open, status, setStatus, close, setComponentRender, component, setComponentName, componentName};

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
};