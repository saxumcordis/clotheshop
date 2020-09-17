import React, {useCallback, useEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useAsync} from "../../../Service/useAsync";

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

    const getData = useCallback(() => fetch("https://miktina.herokuapp.com/backend/user/orders.php?orderList&token=" + user.token), [setOrders]);
    const {data, loading, error} = useAsync(getData);


    if(loading)
        return <div>Идёт загрузка истории заказов...</div>;

    if(error)
        return <div>{error}</div>;

    return (
        <div className="orders_list">
            <h1>История заказов</h1>
            {data && data.map((item, index) => <Order item={item} key={index}/>)}
        </div>
    )
});