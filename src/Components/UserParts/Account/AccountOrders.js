import React, {useCallback, useEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useAsync} from "../../../Service/useAsync";

const months = {
    1: "Января",
    2: "Февраля",
    3: "Марта",
    4: "Апреля",
    5: "Мая",
    6: "Июня",
    7: "Июля",
    8: "Августа",
    9: "Сентября",
    10: "Октября",
    11: "Ноября",
    12: "Декабря"
};

const Order = ({item}) => {

    console.log(item);
    return (
        <div className="order">
            <div className="order_info">
            </div>
            <div className="order_items">
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
            {data && data.map((item, index) => <Order item={item} key={index}/>)}
        </div>
    )
});