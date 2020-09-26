import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useCart} from "../../../Service/Contexts/CartContext";
import {AddressSuggestions} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import {handleAddress, handlePrice} from "../../../Service/StringHandler/StringHandler";
import {initAddress, initOrder} from "../../../Service/Server/order";
import {useOrder} from "../../../Service/Contexts/OrderContext";
import {Link} from "react-router-dom";
import {AccountDrawer} from "../../UserParts/AccountDrawer";
import {useDrawer} from "../../../Service/Contexts/Drawer";
import {Coupon} from "../Cart/Coupon";
import {distanceFromMkad, isInMkad, personalToAddress} from "../../../Service/addressService";


const contactFields = [
    {
        title: "Имя",
        name: "name",
    },
    {
        title: "Фамилия",
        name: "surname",
    },
    {
        title: "Эл. почта",
        name: "email",
    },
    {
        title: "Телефон",
        name: "phone",
    }
];

const DeliveryTime = ({delivery, setDelivery}) => {

    const timeSteps = [
        "09:00-12:00",
        "12:00-15:00",
        "15:00-18:00",
        "18:00-21:00",
        "21:00-23:00"];

    return <ul className="order_delivery_time">
        <span>Выберите желаемое время доставки</span>
        {timeSteps.map((item, index) => <p key={index} className="delivery_vary"><input type="checkbox"
                                                                                        className="checkbox"
                                                                                        checked={delivery.time === item}
                                                                                        onClick={() => setDelivery({
                                                                                            ...delivery,
                                                                                            time: item
                                                                                        })}/>
            <label>{item}</label></p>)}
    </ul>
};

const Delivery = ({address}) => {
    const {setOrderDelivery, order} = useOrder();
    const [delivery, setDelivery] = useState(order.delivery);
    const {personal} = useUser();
    const [geo_lat, geo_lon] = address ? [address.data.geo_lat,address.data.geo_lon] : [personal.geo_lat, personal.geo_lon];

    useEffect(() => setOrderDelivery(delivery), [delivery]);
    const addressInfo = {isInMkad: isInMkad(geo_lat, geo_lon), distance: distanceFromMkad(geo_lat, geo_lon)};
    const isCourierArea = () => addressInfo.isInMkad || addressInfo.distance < 41;
    const calculateOutMKAD = () => addressInfo.distance < 10 ? 400 : (addressInfo.distance >= 10 && addressInfo.distance < 20) ? 500 : (addressInfo.distance >= 20 && addressInfo.distance < 40) ? 1000 : null;
    const calculateCourierDelivery = useCallback(() => isCourierArea() ? addressInfo.isInMkad ? 300 : calculateOutMKAD() : 480, [address]);
    console.log(addressInfo);

    const deliveryInfo = {
        courier: <p className="delivery_vary"><input type="checkbox" className="checkbox"
                                                     checked={delivery.type === "courier_delivery"}
                                                     onClick={() => setDelivery({
                                                         ...delivery,
                                                         type: "courier_delivery",
                                                         price: calculateCourierDelivery()
                                                     })}
                                                     id="courier_delivery"/><label>Доставка курьером с возможностью
            примерки - <span
                style={{color: "red"}}>{calculateCourierDelivery()}</span> Р</label></p>,
        post: <p className="delivery_vary">
            <input type="checkbox" className="checkbox" id="post_delivery" checked={delivery.type === "post_delivery"}
                   onClick={() => setDelivery({...delivery, type: "post_delivery", price: 480})}/>
            <label>Доставка Почтой России - <span
                style={{color: "red"}}>480</span> Р</label>
        </p>
    };

    return <div className="order_delivery_form">
        {isCourierArea() && calculateCourierDelivery() ? deliveryInfo.courier : null}
        {delivery.type === "courier_delivery" && <DeliveryTime delivery={delivery} setDelivery={setDelivery}/>}
        {deliveryInfo.post}
    </div>;
};


const Personal = () => {

    const {personal} = useUser();

    return <div className="order_form">
        {contactFields.map((e, index) => <p key={index} className="order_field">
            <label>{e.title}</label>
            <input required placeholder={personal[e.name]} type="text" name={e.name}
                   id={"order_" + e.name + "_input"}/>
        </p>)}
    </div>
};

const Address = () => {
    const {personal} = useUser();
    const {setOrderAddress} = useOrder();
    const [address, setAddress] = useState(personalToAddress(personal));
    const [loading, setLoading] = useState(false);

    useEffect(() => setOrderAddress(address), [setAddress, address]);

    console.log(address);
    return <div className="order_form">
        <p className="order_field">
            <label>Адрес доставки</label>
            <AddressSuggestions token="b58d963e5c648936410b2cb8d4db57f101d3c2a4"
                onChange={setAddress}
                                inputProps={{
                                    placeholder: handleAddress(personal) || "Укажите адрес доставки",
                                    className: "order_field_address",
                                    id: "delivery_address_input"
                                }}
                                suggestionClassName="address_suggestions"
                                highlightClassName="address_suggestions_highlight"
            />
        </p>
        {loading && "Вычисляем стоимость доставки"}
        {address && !loading && <Delivery address={address}/>}
    </div>
};

const Payment = () => {
    const {setOrderPayment, order} = useOrder();
    const [payment, setPayment] = useState(order.payment);
    useEffect(() => setOrderPayment(payment), [payment]);

    return (
        <div className="order_form">
            <label className="order_warning">Оплата картой онлайн временно недоступна</label>
            <p className="checkbox_box">
                <input type="checkbox" className="checkbox" disabled id="card_payment"
                       checked={payment.type === "card_payment"}
                       onClick={() => setPayment({...payment, type: "card_payment"})}/>
                <label>Оплата картой на сайте</label>
            </p>
            {order.delivery.type === "courier_delivery" && <p className="checkbox_box">
                <input type="checkbox" className="checkbox" id="cash_payment" checked={payment.type === "cash_payment"}
                       onClick={() => setPayment({type: "cash_payment"})}/>
                <label>Оплата наличными курьеру</label>
            </p>
            }
            {order.delivery.type === "post_delivery" && <p className="checkbox_box">
                <input type="checkbox" className="checkbox" id="post_payment" checked={payment.type === "post_payment"}
                       onClick={() => setPayment({type: "post_payment"})}/>
                <label>Оплата при получении</label>
            </p>
            }
            {order.delivery.type === "courier_delivery" && payment.type === "post_payment" || order.delivery.type === "post_delivery" && payment.type === "cash_payment" ?
                <label className="order_warning">Не забудьте выбрать тип оплаты</label> : null}
        </div>
    )

};

const OrderItem = ({item}) => {

    const salePrice = Math.floor((100 - item.discount) * item.price / 100);

    return (<div className="small_cart_item">
        <div className="small_cart_item_photo">
            <Link to={"/catalog/item/" + item.id}><img src={item.photo} className="small_cart_item_photo"
                                                       alt="Изображение товара"/></Link>
        </div>
        <table className="small_cart_item_table">
            <td className="small_cart_item_table_name"><p>{item.name + " (" + item.size + ")"}</p>
                <p>Размер : {item.size}</p>
                <p style={{fontSize: "9px", color: "#999999", paddingBottom: 0}}>art: {item.art}</p></td>
            <td className="small_cart_item_table_quantity">{item.quantity} шт</td>
            <td className="small_cart_item_table_price">{+salePrice === +item.price ? handlePrice(item.quantity * item.price) : handlePrice(item.quantity * (+salePrice))}</td>
        </table>
    </div>);
}


const Items = () => {
    const {cart} = useCart();

    return (<div className="order_form">
        {!!cart.length && cart.map((item, index) => <OrderItem key={index} item={item}/>)}
    </div>);
};


const Summary = () => {
    const {promo, cart, clearCart} = useCart();
    const [loading, setLoading] = useState(false);
    const {personal, user} = useUser();
    const {order, setOrderSale} = useOrder();
    const totalPrice = useCallback(cart.length && cart.map(item => item.quantity * Math.floor((100 - item.discount) * item.price / 100)).reduce((a, b) => a + b), [cart, promo]);
    const finalPrice = Math.round((totalPrice * (100 - (promo && promo.sale)) / 100));

    useEffect(() => setOrderSale(promo), [promo]);

    if (loading === false)
    return (
        <div className="order_form">
            <div className="order_summary_info">
                <span>Сумма товаров: {handlePrice(finalPrice)}</span>
                <span>Доставка: {handlePrice(order.delivery.price)}</span>
                <span className="order_summary_price">Итого: {handlePrice(finalPrice + order.delivery.price)}</span>
            </div>
            <Coupon/>
            <div className="order_contacts">
                <p>Официальные источники коммуникации</p>
                <span>ТЕЛЕФОН ДЛЯ ПОДТВЕРЖДЕНИЯ ЗАКАЗА</span>
                <span>WHATSAPP ЗАКАЗЫ</span>
            </div>
            <Link to="/cart" className="link_to_cart"><span className="link_to_cart">Редактировать заказ</span></Link>
            <span className="cart_total_confirm_button"
                  onClick={() => initOrder(personal, cart, order, user, promo, clearCart, setLoading)}>Оформить заказ</span>
        </div>
    );
    else if (loading === true)
        return (
            <div className="order_form">
                Заказ формируется
            </div>
        );
    else if (+loading === 1)
        return (
            <div className="order_form">
                Заказ сформирован
            </div>
        );
    else if (+loading === 0)
        return (
            <div className="order_form">
                Ошибка. Внимательно проверьте введённые данные и повторите попытку.
                {setTimeout(() => setLoading(false), 1500)}
            </div>
        );
};

export const Order = () => {

    const {cart} = useCart();
    const {user, setStage} = useUser();
    const {setStatus, status, setComponentRender, setComponentName} = useDrawer();

    if (user === 'guest' && status !== 'open') {
        setComponentName('login');
        setStage('register');
        setComponentRender(<AccountDrawer/>);
        setStatus('open');
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <div className="order_box">
                        <div className="not_registered">
                            <h3>Чтобы приступить к процедуре оформления заказа, Вам необходимо создать личный кабинет на
                                нашем сайте</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if (user !== 'guest')
        return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="order_box">
                    {!!cart.length &&
                    <div className="order_left_column">
                        <div className="order_title"><h1>Контактная информация</h1><span>1</span></div>
                        <Personal/>
                        <div className="order_title"><h1>Доставка</h1><span>2</span></div>
                        <Address/>
                        <div className="order_title"><h1>Оплата</h1><span>3</span></div>
                        <Payment/>
                        <div className="order_title"><h1>Подтверждение заказа</h1><span>4</span></div>
                        <Items/>
                        <div className="order_title"><h1>Итого</h1><span>5</span></div>
                        <Summary/>
                        <div className="order_title"><label className="order_agreement">Нажимая на кнопку, Вы даёте
                            согласие на обработку своих <Link to="/about/policy">персональных данных.</Link>
                        </label><span/><span>:)</span></div>
                    </div>
                    }
                    {!cart.length && <div className="order_empty">
                        <h3>Тут ничего нет :(</h3>
                        <Link to="/catalog"><p>Продолжить покупки</p></Link>
                    </div>}
                </div>
            </div>
        </div>
    );
    else
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <div className="order_box">
                        <div className="order_left_column">
                        <p>Чтобы приступить к процедуре оформления заказа, Вам необходимо создать личный кабинет на
                            нашем сайте</p>
                        </div>
                    </div>
                </div>
            </div>
        )

};