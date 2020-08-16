import React from 'react';
import {useCart} from "../../../Service/CartContext";



const ItemDrawer = ({item}) => {

    return (
        <div className="small_cart_item">
            {item.name}
        </div>
    )
};

export const CartDrawer = () => {
    const {cart} = useCart();
    console.log(cart);
    return (
        <div className="cart_drawer">
            {cart.map(item => <ItemDrawer key={item.id + item.size} item={item}/>)}
        </div>
    )
};