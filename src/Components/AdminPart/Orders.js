import React, {useEffect, useState} from 'react';
import {useUser} from "../../Service/Contexts/UserContext";
import {handleClientName, handleOrderDate, handlePrice} from "../../Service/StringHandler/StringHandler";
import {OrderItem} from "../UserParts/Account/AccountOrders";

const Order = ({order}) => {
    const deliveryTypes = {
        "post_delivery": "Доставка почтой",
        "courier_delivery": "Доставка курьером"
    };

    const [visibility, setVisibility] = useState(0);
    const {isAdmin} = useUser();

    const submitNewStatus = async (orderId) => {
        if (window.confirm("Обновить статус заказа?")) {
            const newStatus = document.getElementById(orderId + "_new_order_status").value;
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?changeOrderStatus&token=';
            const data = isAdmin.token + "&orderId=" + orderId + "&newStatus=" + newStatus;
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    if (!visibility)
        return (
            <div className="admin_order_small">
                <div className="order_info_title">
                    <span className="order_info_title_id">#{order.order_id} <span
                        className="order_info_title_date"> / {handleOrderDate(order.created)} </span>
                    </span>
                    <span className="order_info_details_field">
                        Статус заказа <span className="order_info_details_value"> {order.status} </span>
                    </span>
                    <span className="order_info_details_field">
                        Доставка <span className="order_info_details_value"> {deliveryTypes[order.delivery_type]} </span>
                    </span>
                </div>
                <button onClick={() => setVisibility(1)}>Подробнее</button>
            </div>
        )
    if (visibility)
        return (
            <div className="admin_order">
                <div className="order_info">
                    <div className="order_info_title">
                    <span className="order_info_title_id">#{order.order_id} <span
                        className="order_info_title_date"> / {handleOrderDate(order.created)} </span>
                    </span>
                    </div>
                    <div className="order_info_details">
                        <span className="order_info_details_field">
                            Статус заказа <span className="order_info_details_value"> {order.status} </span>
                        </span>
                        <span className="order_info_details_field">
                            Клиент <span className="order_info_details_value"> {handleClientName(order.name, order.surname)} </span>
                        </span>
                        <span className="order_info_details_field">
                            Email <span className="order_info_details_value"> {order.email} </span>
                        </span>
                        <span className="order_info_details_field">
                            Телефон <span className="order_info_details_value"> {order.phone} </span>
                        </span>
                        <span className="order_info_details_field">
                            Доставка <span className="order_info_details_value"> {deliveryTypes[order.delivery_type]} </span>
                        </span>
                        <span className="order_info_details_field">
                            Адрес <span className="order_info_details_value"> {order.address_value + ", " + order.postal_code} </span>
                        </span>
                        <span className="order_info_details_field">
                            На сумму <span className="order_info_details_value"> {handlePrice(order.sale_price)} </span>
                        </span>
                        {(+order.promo_sale) ? <span className="order_info_details_field">
                            Скидка по промокоду <span className="order_info_details_value"> {order.promo_sale} % </span>
                            </span>
                            : null}
                    </div>
                    <button onClick={() => setVisibility(0)}>Скрыть</button>
                </div>
                <div className="order_items">
                    {order.items.map((item, index) => <OrderItem item={item} sale={(+order.promo_sale)} key={index}/>)}
                </div>
                <div className="admin_order_edit">
                    Новый статус заказа
                    <input type="text" id={order.order_id + "_new_order_status"}/>
                    <button onClick={() => submitNewStatus(order.order_id)}>Обновить статус заказа</button>
                </div>
            </div>
        );
};


export const Orders = () => {

    const [orders, setOrders] = useState(0);
    const {isAdmin} = useUser();
    useEffect(() => {
        (async () => {
            const orders = await fetch('https://miktina.herokuapp.com/backend/user/admin.php?getOrders&token=' + isAdmin.token);
            setOrders(await orders.json());
        })();
    }, [setOrders]);

    return <div className="admin_orders_box" id="admin_orders_box">
        {orders && orders.sort((a, b) => b.order_id - a.order_id).map((order, index) => <Order order={order}
                                                                                               key={index}/>)}
    </div>
};