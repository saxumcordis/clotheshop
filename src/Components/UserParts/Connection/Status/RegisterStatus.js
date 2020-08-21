import {useUser} from "../../../../Service/Contexts/UserContext";
import React from "react";

export const StatusRegisterDrawer = () => {
    const {stageStatus, setStageStatus, setStage} = useUser();
    const refreshStatus = () => {
        setTimeout(() => {
            setStage('register');
            setStageStatus(0);
        }, 4000);
        return null;
    };
    const messages = {
        1: ['Спасибо за регистрацию', 'Для активации Вашего профиля следуйте инструкциям, которые были высланы Вам на почту'],
        10: ['Пользователь с таким email существует', 'Заполните форму регистрации повторно, указав другой Email'],
        0: ['none', 'none']
    };
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>{messages[stageStatus][0]}</h1>
                <h3>{messages[stageStatus][1]}</h3>
                {stageStatus === 10 ? refreshStatus() : null}
            </div>
        </div>
    );

};