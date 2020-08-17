import React, {useCallback, useEffect} from 'react'
import {usePath} from "../../Service/PathContext";
import {useCart} from "../../Service/CartContext";
import {Link} from "react-router-dom";
import {QuantityInput} from "../ShopParts/Cart/CartDrawer";
import {beautyPrice} from "../ShopParts/Product/Product";

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
                            <td style={{width: "27%"}}>Товар</td>
                            <td style={{width: "27%", textAlign: "center"}}>Количество</td>
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
                            <p>{item.name + " (" + item.size + ")"}</p>
                            <p>Размер : {item.size}</p>
                            <p style={{fontSize: "9px", color: "#999999", paddingBottom: 0}}>art: {item.art}</p>
                        </td>
                        <td style={{width: "30%", textAlign: "center"}} className="cart_item_table_quantity">
                            <QuantityInput item={item}/>
                        </td>
                        <td className="cart_item_table_price">
                            {+salePrice === +item.price ? beautyPrice(quantity * item.price) :
                                <p>{beautyPrice(quantity * salePrice)} <p style={{
                                    color: "#999999",
                                    textDecoration: "line-through",
                                    fontSize: "9px"
                                }}>{beautyPrice(quantity * item.price)}</p></p>}
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
    const {setPath} = usePath();
    const totalPrice = useCallback(cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b, 0), [cart]);
    useEffect(() => setPath('/cart'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="cart_box">
                    <h1>Ваша корзина</h1>
                    {!!cart.length && <div className="cart">
                        <div className="cart_item_list">
                            {cart.map(item => <CartItem key={cart.indexOf(item) + "_cart_item"}
                                                        index={cart.indexOf(item)}
                                                        item={item}/>)}
                        </div>
                        <div className="cart_total">
                            <Link to="/catalog"><p>Продолжить покупки</p></Link>
                            <span>ИТОГО: {beautyPrice(totalPrice)}</span>
                        </div>
                        <span className="cart_total_confirm_button">Оформить заказ</span>
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