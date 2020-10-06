import React, {useCallback} from 'react'
import {useCart} from "../../Service/Contexts/CartContext";
import {Link} from "react-router-dom";
import {QuantityInput} from "../ShopParts/Cart/CartDrawer";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {handlePrice} from "../../Service/StringHandler/StringHandler";

const CartItem = ({index, item}) => {

    const salePrice = Math.floor((100 - item.discount) * item.price / 100);
    const quantity = item.quantity;

    const {removeFromCart} = useCart();

    return (
        <div className="cart_item">
            <Link to={"catalog/item/" + item.id}><img className="cart_item_photo" src={item.photo}
                                                      alt="Изображение товара"/></Link>
            <div className="cart_item_table">
                <table>
                    {index === 0 ? <thead>
                        <tr>
                            <td className="cart_item_table_name">Товар</td>
                            <td className="cart_item_table_quantity">Количество</td>
                            <td>Цена</td>
                            <td/>
                        </tr>
                        </thead>
                        : <thead>
                        <tr>
                        </tr>
                        </thead>}
                    <tbody>
                    <tr>
                        <td style={{width: "27%"}} className="cart_item_table_name">
                            <p>{item.name + " (" + item.size.split('_')[0] + ")"}</p>
                            <p>Размер : {item.size.split('_')[0]}</p>
                            <p className="cart_item_table_code">art: {item.art}</p>
                        </td>
                        <td style={{width: "30%", textAlign: "center"}} className="cart_item_table_quantity">
                            <QuantityInput item={item}/>
                        </td>
                        <td className="cart_item_table_price">
                            {+salePrice === +item.price ? handlePrice(quantity * item.price) :
                                <p>{handlePrice(quantity * salePrice)} <p style={{
                                    color: "#999999",
                                    textDecoration: "line-through",
                                    fontSize: "9px"
                                }}>{handlePrice(quantity * item.price)}</p></p>}
                        </td>
                        <td style={{width: "10%"}} className="cart_item_table_remove"><span onClick={() => {
                            if (window.confirm("Действительно хотите удалить товар из корзины?"))
                                removeFromCart(item);
                        }}>×</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const Cart = () => {
    const {cart} = useCart();
    const {warning} = useDrawer();
    const totalPrice = useCallback(cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b, 0), [cart]);
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="cart_box">
                    <h1>Ваша корзина</h1>
                    {warning &&
                    <p className={"cart_warning " + (warning ? "" : "disabled")}>Для оформления заказа недостаточно
                        товара</p>}
                    {!!cart.length && <div className="cart">
                        <div className="cart_item_list">
                            {!!cart.length && cart.map(item => <CartItem key={cart.indexOf(item) + "_cart_item"}
                                                        index={cart.indexOf(item)}
                                                        item={item}/>)}
                        </div>
                        <div className="cart_total">
                            <Link to="/catalog"><p>Продолжить покупки</p></Link>
                            <span>ИТОГО: {handlePrice(totalPrice)}</span>
                        </div>
                        <Link to="/order"><span className="cart_total_confirm_button">Оформить заказ</span></Link>
                    </div>}
                    {!cart.length && <div className="cart_empty">
                        <h3>Тут ничего нет :(</h3>
                        <Link to="/catalog"><p>Продолжить покупки</p></Link>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export {Cart}