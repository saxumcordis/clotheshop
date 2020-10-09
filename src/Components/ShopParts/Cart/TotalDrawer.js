import React, {useCallback} from 'react'
import {useCart} from "../../../Service/Contexts/CartContext";
import {useDrawer} from "../../../Service/Contexts/Drawer";
import {Link} from "react-router-dom";
import {handlePrice} from "../../../Service/StringHandler/StringHandler";
import {Coupon} from "./Coupon";


export const TotalCartDrawer = () => {
    const {cart, promo} = useCart();
    const {close} = useDrawer();
    const totalPrice = useCallback(cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b), [cart, promo]);
    return (
        <div className="small_cart_total">
            <Coupon/>
            <div className="small_cart_total_price">
                <span>ИТОГО: {handlePrice(totalPrice * (100 - (promo && promo.sale)) / 100)} {!!promo && <s style={{color: "grey"}}>{handlePrice(totalPrice)}</s>}</span>
            </div>
            <div className="small_cart_total_confirm">
                <Link to="/order" onClick={() => close()}><span className="cart_total_confirm_button">Оформить заказ</span></Link>
                <p onClick={() => close()}>Продолжить покупки</p>
            </div>
        </div>);
};