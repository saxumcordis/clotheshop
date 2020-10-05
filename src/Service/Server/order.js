import React from 'react';
import {personalToAddress} from "../addressService";
import {handleAddress} from "../StringHandler/StringHandler";


export const enterPromo = async (token, setPromo) => {
    const promo = document.getElementById('promo_code_value').value || document.getElementById('promo_code_value').placeholder;
    if (promo.length) {
        const response = await fetch("https://miktina.herokuapp.com/backend/user/orders.php?usePromo&token=" + token + "&promoCode=" + promo)
        setPromo(await response.json());
    }
};

const handleDelivery = (delivery) => {
    return "&deliveryType=" + delivery.type + "&deliveryTime" + (delivery.time.length ? ("=" + delivery.time) : "");
};

const handlePayment = (payment) => {
    return "&paymentType=" + payment.type;
};

const handlePromo = (promo) => {
    return "&promoValue" + (promo.value ? "=" + promo.value : "");
};

const handleAddressValue = (address) => {

    const isNull = (field) => (field === null || field === '-' || field === "");
    if (address.value)
        return "&address_value=" + address.value + (!isNull(address.data.postal_code) ? "&postal_code=" + address.data.postal_code : "");

    /*return "&country=" + address.data.country + "&city=" + address.data.city
        + "&street=" + address.data.street + "&house=" + address.data.house
        + (!isNull(address.data.block) ? "&block=" + address.data.block : "")
        + (!isNull(address.data.flat) ? "&flat=" + address.data.flat : "")
        + (!isNull(address.data.postal_code) ? "&postal_code=" + address.data.postal_code : "")*/
    return "&address_value=" + handleAddress(address.data) + (!isNull(address.data.postal_code) ? "&postal_code=" + address.data.postal_code : "");
};

const validateAddress = (address) => {
    return address.data.house;
};

export const initOrder = async (personal, order, user, promo, clearCart, setLoading, setWarning, clearOrder) => {
    if (validateAddress(order.address.value ? order.address : personalToAddress(personal))) {
        setLoading(true);
        const url = "https://miktina.herokuapp.com/backend/user/orders.php?submitOrder&token=";
        const data = user.token + handleDelivery(order.delivery) + handlePayment(order.payment) + handlePromo(promo) + handleAddressValue(order.address.value ? order.address : personalToAddress(personal));
        const response = await fetch(url + data);
        console.log(url + data);
        if (await response.json() === 0) {
            setLoading(0);
            return;
        }
        setLoading(1);
        setTimeout(() => {
            clearCart();
            clearOrder();
            window.location = '/account';
        }, 1500);
        //TODO: loading
    }
    else
        setWarning('Проверьте введённые данные')

};