import React from 'react';


export const enterPromo = async (token, setPromo) => {
    const promo = document.getElementById('promo_code_value').value || document.getElementById('promo_code_value').placeholder;
    if (promo.length) {
        const response = await fetch("https://miktina.herokuapp.com/backend/user/orders.php?usePromo&token=" + token + "&promoCode=" + promo)
        setPromo(await response.json());
    }
};

export const initAddress = async (token, address, setAddress, setLoading) => {
    setLoading(true);
    const url = "https://miktina.herokuapp.com/backend/api/address.php?token=";
    const data = token + "&initAddress&address=" + address;
    const response = await fetch(url + data);
    setAddress(await response.json());
    setLoading(false);
};

const handleItems = (items) => {
    let result = [];
    items.forEach((item, index) => result.push("&itemId" + (index + 1) + "=" + item.id + "&itemSize" + (index + 1) + "=" + item.size + "&itemQuantity" + (index + 1) + "=" + item.quantity));
    return result.join('') + "&countItems=" + items.length;
};

const handleDelivery = (delivery) => {
    return "&deliveryType=" + delivery.type + "&deliveryTime" + (delivery.time.length ? ("=" + delivery.time) : null);
};

export const initOrder = (personal, items, order, user) => {
    console.log(personal);
    console.log(items);
    console.log(order);
    console.log(handleItems(items));
    console.log(handleDelivery(order.delivery))
};