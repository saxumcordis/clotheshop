import {useUser} from "../../../Service/Contexts/UserContext";
import React from 'react';
import {updateAddress} from "../../../Service/Server/personalSettings";


export const AddressEdit = () => {
    const {personal, setPersonal} = useUser();

    return (
        <div className="account_right_address_edit">
            <p className="address_field">
                Страна
                <input type="text" id="address_country" placeholder={personal.country}/>
            </p>
            <p className="address_field">
                Город
                <input type="text" id="address_city" placeholder={personal.city}/>
            </p>
            <p className="address_field">
                Улица
                <input type="text" id="address_street" placeholder={personal.street}/>
            </p>
            <p className="address_field">
                Индекс
                <input type="text" id="address_zip" placeholder={personal.zip}/>
            </p>
            <p className="address_field">
                Дом
                <input type="text" id="address_building" placeholder={personal.building}/>
            </p>
            <p className="address_field">
                Корпус
                <input type="text" id="address_pavilion" placeholder={personal.pavilion}/>
            </p>
            <p className="address_field">
                Квартира/Офис
                <input type="text" id="address_flat" placeholder={personal.flat}/>
            </p>
            <p className="address_field">
                Телефон
                <input type="text" id="address_phone" placeholder={personal.phone}/>
            </p>
            <button className="personal_button" onClick={() => updateAddress(personal.address_id, setPersonal)}>Сохранить</button>
        </div>
    );
};