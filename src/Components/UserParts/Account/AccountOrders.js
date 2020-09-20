import React, {useCallback, useEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useAsync} from "../../../Service/useAsync";
import {handleOrderDate, handlePrice} from "../../../Service/StringHandler/StringHandler";
import {Link} from "react-router-dom";

const OrderItem = ({item, sale}) => {

    const price = item && Math.floor((100 - sale) * item.price / 100);

    return <div className="order_item">
        <img className="order_item_picture" alt="order_item_picture" src={item.picture}/>
        <span className="order_item_name"><Link to={"catalog/item/" + item.product_id}> {item.name + " (" + item.size + ")"} </Link></span>
        <span className="order_item_quantity">Количество: {item.quantity} шт</span>
        <span className="order_item_price">{handlePrice(item.quantity*price)}</span>
    </div>
};

const Order = ({order}) => {

    return (
        <div className="order">
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
                        Доставка <span className="order_info_details_value"> {order.delivery} </span>
                    </span>
                    <span className="order_info_details_field">
                        На сумму <span className="order_info_details_value"> {handlePrice(order.sale_price)} </span>
                    </span>
                    {(+order.client_sale) ? <span className="order_info_details_field">
                        Персональная скидка <span className="order_info_details_value"> {order.client_sale} % </span>
                    </span> : null}
                    {(+order.promo_sale) ? <span className="order_info_details_field">
                        Скидка по промокоду <span className="order_info_details_value"> {order.promo_sale} % </span>
                    </span> : null}
                </div>
            </div>
            <div className="order_items">
                {order.items.map((item, index) => <OrderItem item={item} sale={(+order.client_sale) + (+order.promo_sale)} key={index}/>)}
            </div>
        </div>
    );
};


export const OrderList = React.memo(() => {
    const {user} = useUser();
    const [orders, setOrders] = useState(0);

    const getData = useCallback(() => fetch("https://miktina.herokuapp.com/backend/user/orders.php?orderList&token=" + user.token), [setOrders]);
    const {data, loading, error} = useAsync(getData);


    if (loading)
        return <div>Идёт загрузка истории заказов...</div>;

    if (error)
        return <div>{error}</div>;

    return (
        <div className="orders_list">
            <h1>История заказов</h1>
            {data && data.sort((a, b) => b.order_id - a.order_id).map((order, index) => <Order order={order} key={index}/>)}
        </div>
    )
});