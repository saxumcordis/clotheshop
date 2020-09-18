import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";
import {useCart} from "../../../Service/Contexts/CartContext";
import {AddressSuggestions} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import {handleAddress} from "../../../Service/StringHandler/StringHandler";
import {initAddress} from "../../../Service/Server/order";


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

const Delivery = ({address}) => {

    console.log(address);
    return 2;
};

export const Order = () => {

    const {personal, user} = useUser();
    const {promo} = useCart();
    const [address, setAddress] = useState();

    useEffect(() =>{( async () => {
        if (user !== 'guest') {
            initAddress(user.token, handleAddress(personal), setAddress);
        }
    })();
    }, [setAddress]);

    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="order_box">
                    <div className="order_left_column">
                        <div className="order_title"><h1>Контактная информация</h1><span>1</span></div>
                        <div className="order_form">
                            {contactFields.map((e, index) => <p key={index} className="order_field">
                                <label>{e.title}</label>
                                <input required placeholder={personal[e.name]} type="text" name={e.name}
                                       id={"order_" + e.name + "_input"}/>
                            </p>)}
                        </div>
                        <div className="order_title"><h1>Доставка</h1><span>2</span></div>
                        <div className="order_form">
                            <p className="order_field">
                                <label>Адрес доставки</label>
                            <AddressSuggestions token="b58d963e5c648936410b2cb8d4db57f101d3c2a4"
                                                onChange={() => initAddress(user.token, document.getElementById("delivery_address_input").value, setAddress)} inputProps={{
                                placeholder: handleAddress(personal) || "Укажите адрес доставки",
                                className: "order_field_address",
                                id: "delivery_address_input"
                            }}
                                                suggestionClassName="address_suggestions"
                                                highlightClassName="address_suggestions_highlight"
                            />
                            </p>
                            <Delivery address={address}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};