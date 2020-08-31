import React from 'react';
import {useUser} from "../../../Service/Contexts/UserContext";


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

export const Order = () => {

    const {personal} = useUser();

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};