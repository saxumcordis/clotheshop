import {months} from "../../Components/SystemParts/Months";
import React from 'react';

export const handleOrderDate = (date) => {
    const orderDate = date.split(' ')[0].split('-');
    return orderDate[2] + " " + months[+orderDate[1]] + " " + orderDate[0];
};

export const handlePrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + " P";
};


export const handleAddress = (personal) => {

    const isNull = (field) => (field === "" || field === "-");

    const city = "г " + personal.city;
    const street = "ул " + personal.street;
    const building = "д " + personal.building + (isNull(personal.pavilion) ? "" : " к " + personal.pavilion);
    const flat = (isNull(personal.flat) ? "" : " кв " + personal.flat);
    return [city, street,building, flat].join(', ');
};