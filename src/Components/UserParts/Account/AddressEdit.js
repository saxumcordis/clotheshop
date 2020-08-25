import {useUser} from "../../../Service/Contexts/UserContext";
import React from 'react';


export const AddressEdit = () => {
    const {personal, setPersonal} = useUser();

    return (
        <div className="account_right_address_edit">
            <p className="address_field">
                Страна
                <input type="text" placeholder={personal.country}/>
            </p>
            <p className="address_field">
                Город
                <input type="text" placeholder={personal.city}/>
            </p>
            <p className="address_field">
                Улица
                <input type="text" placeholder={personal.street}/>
            </p>
            <p className="address_field">
                Индекс
                <input type="text" placeholder={personal.zip}/>
            </p>
            <p className="address_field">
                Дом
                <input type="text" placeholder={personal.building}/>
            </p>
            <p className="address_field">
                Корпус
                <input type="text" placeholder={personal.pavilion}/>
            </p>
            <p className="address_field">
                Квартира/Офис
                <input type="text" placeholder={personal.flat}/>
            </p>
            <p className="address_field">
                Телефон
                <input type="text" placeholder={personal.phone}/>
            </p>
        </div>
    );
};