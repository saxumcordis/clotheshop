import {useUser} from "../../Service/UserContext";
import React, {useState} from "react";

export const RegisterDrawer = () => {
    const {setStage} = useUser();

    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Зарегистрируйтесь на MIKTINA</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
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
                <p className="lost_password_link">Забыли пароль?</p>
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
                : <RegisterDrawer/>}
        </div>
    )
};