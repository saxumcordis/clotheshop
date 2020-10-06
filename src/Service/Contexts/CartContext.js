import React, {useCallback, useContext, useEffect, useState} from 'react';
import {updateUserCart} from "../Server/userStorage";

const isInCart = (cart, id, size) => {
    return cart.find(e => e.id === id && e.size === size);
};

export const CartContext = React.createContext({});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const [promo, setPromo] = useState(false);
    const [limitWarning, setLimitWarning] = useState(false);
    const showWarning = useCallback(() => {
        setLimitWarning(true);
        setTimeout(() => setLimitWarning(false), 3000);
    }, [setCart]);
    const isLimit = useCallback((product) => {
        try {
            return (cart.find(e => e.id === product.id && e.size === product.size).quantity >= product.limit);
        } catch {
            return 0;
        }
    }, [cart]);
    const addToCart = useCallback(product => {
        let temp = cart.map(e => e.id === product.id && e.size === product.size ? ({
            ...e,
            quantity: e.quantity + 1,
        }) : e).concat(isInCart(cart, product.id, product.size) ? [] : [product]);
        setCart(temp);
        setTimeout(() => updateUserCart(temp, JSON.parse(localStorage.getItem('user'))), 1000);
    }, [setCart, cart]);
    const removeFromCart = useCallback(product => {
        let temp = cart.filter(e => e !== product);
        setCart(temp);
        setTimeout(() => updateUserCart(temp, JSON.parse(localStorage.getItem('user'))), 1000);
    }, [setCart, cart]);
    const updateItem = useCallback((item, newQuantity) => {
        let temp = cart.map(i => i.id === item.id && i.size === item.size ? ({
            ...i,
            quantity: newQuantity
        }) : i);
        setCart(temp);
        setTimeout(() => updateUserCart(temp, JSON.parse(localStorage.getItem('user'))), 1000);
    }, [cart]);
    const clearCart = useCallback(() => setCart([]), [setCart]);

    const countCartItems = cart.length ? cart.map(e => e.quantity).reduce((a, b) => a + b, 0) : 0;
    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        countCartItems,
        updateItem,
        isLimit,
        limitWarning,
        showWarning,
        promo,
        setPromo,
        clearCart
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export const useCart = () => useContext(CartContext);

export const PersistCart = () => {
    const {cart} = useCart();
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    return <></>
};
