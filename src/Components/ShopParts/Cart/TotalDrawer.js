import React, {useCallback} from 'react'
import {useCart} from "../../../Service/Contexts/CartContext";
import {useDrawer} from "../../../Service/Contexts/Drawer";
import {Link} from "react-router-dom";
import {handlePrice} from "../../../Service/StringHandler/StringHandler";
import {enterPromo} from "../../../Service/Server/order";
import {useUser} from "../../../Service/Contexts/UserContext";

export const Coupon = () => {
    const {user} = useUser();
    const {setPromo, promo} = useCart();
    return (
        <div className="coupon_box">
            <span>У Вас есть промо-код?</span>
            <div className="coupon_form">
                <input type="text" id="promo_code_value" placeholder={promo.value}/>
                <button onClick={() => enterPromo(user.token, setPromo)}>применить</button>
            </div>
        </div>);
};


export const TotalCartDrawer = () => {
    const {cart, promo} = useCart();
    const {close} = useDrawer();
    const totalPrice = useCallback(cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b), [cart, promo]);
    return (
        <div className="small_cart_total">
            <Coupon/>
            <div className="small_cart_total_price">
                <span>ИТОГО: {handlePrice(totalPrice * (100 - (promo && promo.sale)) / 100)}</span>
            </div>
            <div className="small_cart_total_confirm">
                <Link to="/order" onClick={() => close()}><span className="cart_total_confirm_button">Оформить заказ</span></Link>
                <p onClick={() => close()}>Продолжить покупки</p>
            </div>
        </div>);
};