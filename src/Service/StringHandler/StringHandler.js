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
    if (personal.length === 0)
        return "";

    const isNull = (field) => (field === "" || field === "-");

    const city = "г " + personal.city;
    const street = "ул " + personal.street;
    const house = "д " + personal.house + (isNull(personal.block) ? "" : " к " + personal.block);
    const flat = (isNull(personal.flat) ? "" : " кв " + personal.flat);
    return [city, street,house, flat].join(', ');
};

export const handleClientName = (name, surname) => {
    return name + " " + surname;
};