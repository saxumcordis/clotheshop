import React, {useEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";

const Order = ({item}) => {


    return (
        <div className="order">
            {item.order_id}
        </div>
    );
};


export const OrderList = React.memo(() => {
    const {user} = useUser();
    const [orders, setOrders] = useState(0);

    useEffect(() => { (async () => {
        const url = "https://miktina.herokuapp.com/backend/user/orders.php?orderList&token=";
            const orders = await fetch(url + user.token);
            setOrders(await orders.json());
        }
    )()}, [setOrders]);

    return <div className="orders_list">
        <h1>История заказов</h1>
        {orders ? orders.map((item, index) => <Order item={item} key={index}/>) : "Заказов нет"}
    </div>
});