import React, {useCallback, useContext, useEffect, useState} from 'react';

const isInCart = (cart, id, size) => {
    return cart.find(e => e.id === id && e.size === size);
};

export const CartContext = React.createContext({});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const addToCart = useCallback(product => setCart(cart => cart.map(e => e.id === product.id && e.size === product.size ? ({...e, quantity: e.quantity + 1}) : e).concat(isInCart(cart, product.id, product.size) ? [] : [product])), [setCart]);
    const removeFromCart = useCallback(product => setCart(cart => cart.filter(e => e !== product)), [setCart]);
    const updateItem = useCallback((item, newQuantity) => setCart(cart.map(i => i.id === item.id && i.size === item.size ? ({...i, quantity: newQuantity}) : i)), [cart]);
    const countCartItems = cart.map(e => e.quantity).reduce((a, b) => a + b, 0);
    const value = {cart, setCart, addToCart, removeFromCart, countCartItems, updateItem};
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
