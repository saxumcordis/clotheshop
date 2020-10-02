import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'

export const OrderContext = createContext(null);

export const useOrder = () => useContext(OrderContext);

const orderModel = {
    address: {

    },
    delivery: {
        type: "",
        time: "",
        price: "",
    },
    sale: {},
    payment: {
        type: "",
    },
};

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : orderModel);
    const setOrderAddress = useCallback((newAddress) => {
        setOrder({...order, address: newAddress});
    }, [order]);
    const setOrderDelivery = useCallback((newDelivery) => {
        setOrder({...order, delivery: newDelivery});
    }, [order]);
    const setOrderSale = useCallback((newSale) => {
        setOrder({...order, sale: newSale});
    }, [order]);
    const setOrderPayment = useCallback((newPayment) => {
        setOrder({...order, payment: newPayment});
    }, [order]);
    const clearOrder = useCallback(() => {localStorage.removeItem('order'); setOrder(orderModel)}, [setOrder]);

    const value = {order, setOrder, setOrderAddress, setOrderDelivery, setOrderSale, setOrderPayment, clearOrder};

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
};

export const PersistOrder = () => {
    const {order} = useOrder();
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return <></>
};