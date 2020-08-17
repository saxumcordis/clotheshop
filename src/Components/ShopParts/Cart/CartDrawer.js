import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useCart} from "../../../Service/CartContext";
import {beautyPrice} from "../Product/Product";
import {useDrawer} from "../../../Service/Drawer";
import {TotalCartDrawer} from "./TotalDrawer";
import {Link} from "react-router-dom";


const QuantityInput = ({item}) => {
    const {cart, updateItem} = useCart();
    const [inputValue, setValue] = useState(item.quantity);
    const {showWarning} = useDrawer();
    const handleValueChange = e => {
        if (/^[0-9]*$/.test(e.target.value)) {
            const newValue = !e.target.value.length ? 1 : +e.target.value > +item.limit ? +item.limit : +e.target.value === 0 ? 1 : +e.target.value;
            if (+e.target.value > +item.limit) {
                showWarning();
                e.target.value = +item.limit
            } else
                e.target.value = +e.target.value;
            setValue(newValue);
            updateItem(item, newValue);
            if (newValue === 1)
                e.target.value = 1;
        } else
            e.target.value = item.quantity;
    };
    useEffect(() => setValue(item.quantity), [cart]);
    return (
        <input type="text" min="0" max={item.limit}
               value={inputValue} onChange={handleValueChange}/>
    )
};

const ItemDrawer = ({item}) => {

    const salePrice = Math.floor((100 - item.discount) * item.price / 100);
    const quantity = item.quantity;
    const {removeFromCart} = useCart();
    return (
        <div className="small_cart_item">
            <div className="small_cart_item_photo">
                <Link to={"/catalog/item/" + item.id}><img src={item.photo} className="small_cart_item_photo"
                                                          alt="Изображение товара"/></Link>
            </div>
            <table className="small_cart_item_table">
                <tr>
                    <td className="small_cart_item_table_name"><p>{item.name + " (" + item.size + ")"}</p>
                        <p>Размер : {item.size}</p>
                        <p style={{fontSize: "9px", color: "#999999", paddingBottom: 0}}>art: {item.art}</p></td>
                    <td className="small_cart_item_table_quantity">{<QuantityInput item={item}/>}</td>
                    <td className="small_cart_item_table_price">{+salePrice === +item.price ? beautyPrice(quantity * item.price) :
                        <p>{beautyPrice(quantity * salePrice)} <p style={{
                            color: "#999999",
                            textDecoration: "line-through",
                            fontSize: "9px"
                        }}>{beautyPrice(quantity * item.price)}</p></p>}</td>
                    <td className="small_cart_item_table_remove"><span onClick={() => removeFromCart(item)}>×</span>
                    </td>
                </tr>
            </table>
        </div>
    )
};

export const CartDrawer = () => {
    const {cart} = useCart();
    const {close, warning} = useDrawer();
    return (
        <div className="cart_drawer">
            {warning &&
            <p className={"cart_drawer_warning " + (warning ? "" : "disabled")}>Для оформления заказа недостаточно
                товара</p>}
            {cart.map(item => <ItemDrawer key={item.id + item.size} item={item}/>)}
            {!cart.length &&
            <p className="small_cart_empty">Корзина пуста <p onClick={() => close()}>Продолжить покупки </p></p>}
            {!!cart.length && <TotalCartDrawer/>}
        </div>
    )
};