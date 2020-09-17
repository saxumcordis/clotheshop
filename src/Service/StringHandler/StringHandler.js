import {months} from "../../Components/SystemParts/Months";
import React from 'react';

export const handleOrderDate = (date) => {
    const orderDate = date.split(' ')[0].split('-');
    return orderDate[2] + " " + months[+orderDate[1]] + " " + orderDate[0];
};

export const handlePrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + " P";
};