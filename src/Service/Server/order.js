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

const handleDelivery = (delivery) => {
    return "&deliveryType=" + delivery.type + "&deliveryTime" + (delivery.time.length ? ("=" + delivery.time) : "");
};

const handlePayment = (payment) => {
    return "&paymentType=" + payment.type;
};

const handlePromo = (promo) => {
    return "&promoSale=" + promo.sale;
};

export const initOrder = async (personal, items, order, user, promo) => {
   // const url = "https://miktina.herokuapp.com/backend/user/orders.php?submitOrder&token=";
    //const data = user.token + handleDelivery(order.delivery) + handlePayment(order.payment) + handlePromo(promo);
    //const response = await fetch(url + data);
   // console.log(await response.text());
};