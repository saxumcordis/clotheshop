import {useUser} from "../../Service/UserContext";
import React, {useState} from "react";


const validateInput = e => {
};

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

export const RegisterDrawer = () => {
    const {setStage} = useUser();

    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Зарегистрируйтесь на MIKTINA</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form" style={{marginTop: "10px"}}>
                <input type="text" placeholder="Email" name="register_email"/>
                <input type="text" placeholder="Имя" name="register_name"/>
                <input type="text" placeholder="Фамилия" name="register_surname"/>
                <input type="text" placeholder="+_ (___) ___-__-__" name="register_phone" onChange={validateInput}/>
                <input type="date" placeholder="Дата рождения" name="register_birth_date"
                       min="1900-01-01" max="2020-01-01"/>
                <input type="password" placeholder="Пароль" name="register_pass"/>
                <input type="password" placeholder="Повторите пароль" name="register_confirm_pass"/>
                <button className="login_button">Зарегистрироваться</button>
            </div>
            <div className="switch_box">
                <p className="switch title">Вы наш клиент?</p>
                <p className="switch_button" onClick={() => setStage('login')}>ВОЙДИТЕ В ЛИЧНЫЙ КАБИНЕТ</p>
            </div>
        </div>
    );
};

export const LoginDrawer = () => {
    const {setStage} = useUser();

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
            : <RestoreDrawer/>}
        </div>
    )
};