import React, {useEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";

export const OrderList = React.memo(() => {
    const {personal, user} = useUser();
    const [orders, setOrders] = useState(0);

    useEffect(() => { (async () => {
        const url = "https://miktina.herokuapp.com/backend/user/orders.php?orderList&token=";
            const orders = await fetch(url + user.token);
            setOrders(await orders.json());
        }
    )()}, [setOrders]);

    return <div className="orders_list">
        {orders ? orders.map(e => e.order_id) : "Заказов нет"}
    </div>
});