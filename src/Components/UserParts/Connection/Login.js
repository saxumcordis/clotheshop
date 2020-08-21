import {useUser} from "../../../Service/Contexts/UserContext";
import {carryLoginData, loginUser} from "../../../Service/Server/login";
import React, {useLayoutEffect} from "react";
import {validateLogin} from "../../../Service/Validation/loginValidation";

export const LoginDrawer = () => {
    const {setStage, stageStatus, setStageStatus} = useUser();

    const sendLogin = () => {
        const data = loginUser();
        (async () => {
            const response = await fetch(data);
            if (!stageStatus) {
                setStageStatus(await response.json());
            }
        })();
    };

    useLayoutEffect(() => {
        let form = document.getElementById('login_form');
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            if (!stageStatus && validateLogin()) {
                sendLogin();
                carryLoginData('set');
                setTimeout(() => setStage('logged'), 1000);
                return;
            } else return;
        });
    });

    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Войдите в личный кабинет</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form">
                <form style={{width: "222px"}} method="post" id="login_form">
                    <input type="email" id="login_email" placeholder="Email" name="user_login" required/>
                    <input type="password" id="login_password" placeholder="Пароль" name="user_pass" required/>
                    <p className="lost_password_link" onClick={() => setStage('restore')}>Забыли пароль?</p>
                    <input type="submit" style={{color: "white"}} className="login_button" value="Войти"
                           onClick={() => validateLogin()}/>
                </form>
            </div>
            <div className="switch_box">
                <p className="switch title"> У вас ещё нет аккаунта?</p>
                <p className="switch_button" onClick={() => setStage('register')}>ЗАРЕГИСТРИРУЙТЕСЬ</p>
            </div>
        </div>
    );
};