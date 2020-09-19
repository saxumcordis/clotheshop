import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'

export const OrderContext = createContext(null);

export const useOrder = () => useContext(OrderContext);

const orderModel = {
    personal: {},
    address: {

    },
    delivery: {
        type: "",
        time: "",
        price: "",
    },
    items: {},
    sale: {},
};

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : orderModel);
    const setOrderPersonal = useCallback((newPersonal) => {
        const temp = {...order, personal: newPersonal};
        setOrder(temp);
    }, [setOrder]);
    const setOrderAddress = useCallback((newPersonal) => {
        const temp = {...order, personal: newPersonal};
        setOrder(temp);
    }, [setOrder]);
    const setOrderDelivery = useCallback((newDelivery) => {
        const temp = {...order, personal: newDelivery};
        setOrder(temp);
    }, [setOrder]);
    const setOrderItems = useCallback((newItems) => {
        const temp = {...order, personal: newItems};
        setOrder(temp);
    }, [setOrder]);
    const setOrderSale = useCallback((newSale) => {
        const temp = {...order, personal: newSale};
        setOrder(temp);
    }, [setOrder]);

    console.log(order);
    const value = {order, setOrder, setOrderAddress, setOrderDelivery, setOrderItems, setOrderPersonal, setOrderSale};

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
};

export const PersistOrder = () => {
    const {order} = useOrder();
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return <></>
};