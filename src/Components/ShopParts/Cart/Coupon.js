import {useUser} from "../../../Service/Contexts/UserContext";
import {useCart} from "../../../Service/Contexts/CartContext";
import {enterPromo} from "../../../Service/Server/order";
import React from "react";

export const Coupon = () => {
    const {user} = useUser();
    const {setPromo, promo} = useCart();
    return (
        <div className="coupon_box">
            <span>У Вас есть промо-код?</span>
            {promo === 0 && <span className="promo_warning">Указанный промокод не существует, или превышен лимит его использования</span>}
            <div className="coupon_form">
                <input type="text" id="promo_code_value" placeholder={promo.value}/>
                <button onClick={() => enterPromo(user.token, setPromo)}>Применить</button>
            </div>
        </div>);
};
