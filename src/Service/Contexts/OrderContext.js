import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'

export const OrderContext = createContext(null);

export const useOrder = () => useContext(OrderContext);

const orderModel = {
    personal: {},
    address: {},
    delivery: {},
    items: {},
    sale: {},
};

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : orderModel);

    const value = {order, setOrder};

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
};

export const PersistOrder = () => {
    const {order} = useOrder();
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return <></>
};