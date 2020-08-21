import {useUser} from "../../../Service/Contexts/UserContext";
import React from "react";

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