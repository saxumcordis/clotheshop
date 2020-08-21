import {useUser} from "../../../Service/Contexts/UserContext";
import {registerNewUser} from "../../../Service/Server/register";
import React, {useLayoutEffect} from "react";
import {
    isPassConfirmed,
    validateBirthDate,
    validateEmail,
    validatePassword,
    validateRegister
} from "../../../Service/Validation/registerValidation";

export const RegisterDrawer = () => {
    const {setStage, stageStatus, setStageStatus} = useUser();

    const sendRegister = () => {
        const data = registerNewUser();
        (async () => {
            const response = await fetch(data);
            if (!stageStatus) {
                setStageStatus(await response.json());
            }
        })();
    };

    useLayoutEffect(() => {
        let form = document.getElementById('register_form');
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            if (validateRegister()) {
                sendRegister();
                setTimeout(() => setStage('registered'), 1000);
                return;
            } else return;
        });
    });
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Зарегистрируйтесь на MIKTINA</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form" style={{marginTop: "10px"}}>
                <form id="register_form" method="post" style={{width: "222px"}}>
                    <input type="email" id="register_email" placeholder="Email" name="register_email"
                           onChange={() => validateEmail()}/>
                    <input type="text" id="register_name" placeholder="Имя" name="register_name"/>
                    <input type="text" id="register_surname" placeholder="Фамилия" name="register_surname"/>
                    <input type="text" id="register_phone" placeholder="+_ (___) ___-__-__" name="register_phone"/>
                    <input type="date" id="register_birth_date" placeholder="Дата рождения"
                           name="register_birth_date"
                           min="1900-01-01" max="2020-01-01" onChange={() => validateBirthDate()}/>
                    <input type="password" id="register_pass" placeholder="Пароль" name="register_pass"
                           onChange={() => validatePassword()}/>
                    <input type="password" id="register_confirm_pass" placeholder="Повторите пароль"
                           name="register_confirm_pass" onChange={() => isPassConfirmed()}/>
                    <input type="submit" value="Зарегистрироваться" style={{color: "white"}}
                           onClick={() => validateRegister()} className="login_button"/>
                </form>
            </div>
            <div className="switch_box">
                <p className="switch title">Вы наш клиент?</p>
                <p className="switch_button" onClick={() => setStage('login')}>ВОЙДИТЕ В ЛИЧНЫЙ КАБИНЕТ</p>
            </div>
        </div>
    );
};