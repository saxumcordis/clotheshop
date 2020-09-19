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
    payment: {
        type: "",
    },
};

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : orderModel);
    const setOrderPersonal = useCallback((newPersonal) => {
        const temp = {...order, personal: newPersonal};
        setOrder(temp);
    }, [setOrder]);
    const setOrderAddress = useCallback((newAddress) => {
        const temp = {...order, address: newAddress};
        setOrder(temp);
    }, [setOrder]);
    const setOrderDelivery = useCallback((newDelivery) => {
        const temp = {...order, delivery: newDelivery};
        setOrder(temp);
    }, [setOrder]);
    const setOrderItems = useCallback((newItems) => {
        const temp = {...order, items: newItems};
        setOrder(temp);
    }, [setOrder]);
    const setOrderSale = useCallback((newSale) => {
        const temp = {...order, sale: newSale};
        setOrder(temp);
    }, [setOrder]);
    const setOrderPayment = useCallback((newPayment) => {
        const temp = {...order, payment: newPayment};
        setOrder(temp);
    }, [setOrder]);

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