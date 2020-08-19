import React, {useCallback} from 'react'
import {useCart} from "../../../Service/Contexts/CartContext";
import {beautyPrice} from "../Product/Product";
import {useDrawer} from "../../../Service/Contexts/Drawer";

const Coupon = () => {
    return (
        <div className="coupon_box">
            <span>У Вас есть промо-код?</span>
            <div className="coupon_form">
                <input type="text"/>
                <button>применить</button>
            </div>
        </div>);
};


export const TotalCartDrawer = () => {
    const {cart} = useCart();
    const {close} = useDrawer();
    const totalPrice = useCallback(cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b), [cart]);

    return (
        <div className="small_cart_total">
            <Coupon/>
            <div className="small_cart_total_price">
                <span>ИТОГО: {beautyPrice(totalPrice)}</span>
            </div>
            <div className="small_cart_total_confirm">
                <span className="cart_total_confirm_button">Оформить заказ</span>
                <p onClick={() => close()}>Продолжить покупки</p>
            </div>
        </div>);
};