import {useUser} from "../../Service/Contexts/UserContext";
import React, {useLayoutEffect, useState} from "react";
import {
    isPassConfirmed, validateBirthDate,
    validateEmail,
    validatePassword,
    validateRegister
} from "../../Service/Validation/registerValidation";
import {registerNewUser} from "../../Service/Server/register";
import {useDrawer} from "../../Service/Contexts/Drawer";


export const RestoreDrawer = () => {
    const {setStage} = useUser();
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Восстановление пароля</h1>
                <h3>Для восстановления пароля, пожалуйста, укажите Вашу электронную почту</h3>
            </div>
            <div className="login_form" style={{marginTop: "10px"}}>
                <input type="text" placeholder="Ваша электронная почта"/>
                <button className="login_button">Восстановить пароль</button>
            </div>
            <div className="switch_box" style={{marginTop: "30px"}}>
                <p className="switch_button" onClick={() => setStage('login')}>Вернуться назад</p>
            </div>
        </div>
    );
};

export const StatusRegisterDrawer = () => {
    const {registerStatus, setRegisterStatus, setStage} = useUser();
    const refreshStatus = () => {
        setTimeout(() => {
            setStage('register');
            setRegisterStatus(0);
        }, 4000);
        return null;
    }
    const messages = {
        1: ['Спасибо за регистрацию', 'Для активации Вашего профиля следуйте инструкциям, которые были высланы Вам на почту'],
        10: ['Пользователь с таким email существует', 'Заполните форму регистрации повторно, указав другой Email'],
        0: ['none', 'none']
    };
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>{messages[registerStatus][0]}</h1>
                <h3>{messages[registerStatus][1]}</h3>
                {registerStatus === 10 ? refreshStatus() : null}
            </div>
        </div>
    );

};

export const RegisterDrawer = () => {
    const {setStage, setRegisterStatus, registerStatus} = useUser();

    const sendRegister = () => {
        const data = registerNewUser();
        (async () => {
            const response = await fetch(data);
            if (!registerStatus) {
                setRegisterStatus(await response.json());
            }
        })();
        return <></>;
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

export const LoginDrawer = () => {
    const {setStage, registerStatus} = useUser();
    console.log(registerStatus);
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Войдите в личный кабинет</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form">
                <input type="text" placeholder="Email / Номер телефона" name="user_login"/>
                <input type="password" placeholder="Пароль" name="user_pass"/>
                <p className="lost_password_link" onClick={() => setStage('restore')}>Забыли пароль?</p>
                <button className="login_button">Войти</button>
            </div>
            <div className="switch_box">
                <p className="switch title"> У вас ещё нет аккаунта?</p>
                <p className="switch_button" onClick={() => setStage('register')}>ЗАРЕГИСТРИРУЙТЕСЬ</p>
            </div>
        </div>
    );
};

export const AccountDrawer = () => {
    const {stage} = useUser();
    return (
        <div className="account_drawer">
            {stage === 'login' ? <LoginDrawer/>
                : stage === 'register' ? <RegisterDrawer/>
                    : stage === 'registered' ? <StatusRegisterDrawer/>
                        : <RestoreDrawer/>}
        </div>
    )
};