import React, {useLayoutEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useCart} from "../../../Service/Contexts/CartContext";


const contactFields = [
    {
        title: "Имя",
        name: "name",
    },
    {
        title: "Фамилия",
        name: "surname",
    },
    {
        title: "Эл. почта",
        name: "email",
    },
    {
        title: "Телефон",
        name: "phone",
    }
];

const addressFields = [
    {
        title: "Страна",
        name: "country",
    },
    {
        title: "Город",
        name: "city",
    },
    {
        title: "Улица",
        name: "street",
    },
    {
        title: "Индекс",
        name: "zip",
    },
    {
        title: "Дом",
        name: "building",
    },
    {
        title: "Корпус",
        name: "pavilion",
    },
    {
        title: "Квартира",
        name: "flat",
    },
];

const Delivery = () => {
    const {personal} = useUser();

    if (personal.country) {
        if (/Россия/.test(personal.country))
            if (/Москва/.test(personal.city ))
                return 'ПРИМЕРОЧКА';
            else return 'ПОЧТА РОССИИ';
        else return 'СНГ'
    }
    return 2;
};

export const Order = () => {

    const {personal} = useUser();
    const {promo} = useCart();

    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="order_box">
                    <div className="order_left_column">
                        <div className="order_title"><h1>Контактная информация</h1><span>1</span></div>
                        <div className="order_form">
                            {contactFields.map(e => <p className="order_field">
                                <label>{e.title}</label>
                                <input required placeholder={personal[e.name]} type="text" name={e.name}
                                       id={"order_" + e.name + "_input"}/>
                            </p>)}
                        </div>
                        <div className="order_title"><h1>Доставка</h1><span>2</span></div>
                        <div className="order_form">
                            <div className="address_fields">
                                {addressFields.map(e => <p className="order_field">
                                    <label>{e.title}</label>
                                    <input className="order_field_address" required placeholder={personal[e.name]}
                                           type="text" name={e.name}
                                           id={"order_" + e.name + "_input"}/>
                                </p>)}
                            </div>
                            <Delivery/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};