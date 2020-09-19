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
    const setOrderPersonal = useCallback((newPersonal) => {
        setOrder({...order, personal: newPersonal});
    }, [order]);
    const setOrderAddress = useCallback((newAddress) => {
        setOrder({...order, address: newAddress});
    }, [order]);
    const setOrderDelivery = useCallback((newDelivery) => {
        setOrder({...order, delivery: newDelivery});
    }, [order]);
    const setOrderItems = useCallback((newItems) => {
        setOrder({...order, items: newItems});
    }, [order]);
    const setOrderSale = useCallback((newSale) => {
        setOrder({...order, sale: newSale});
    }, [order]);
    const setOrderPayment = useCallback((newPayment) => {
        setOrder({...order, payment: newPayment});
    }, [order]);

    console.log(order);
    const value = {order, setOrder, setOrderAddress, setOrderDelivery, setOrderItems, setOrderPersonal, setOrderSale, setOrderPayment};

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
};

export const PersistOrder = () => {
    const {order} = useOrder();
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return <></>
};