import {useUser} from "../../Service/UserContext";
import React, {useState} from "react";

export const RegisterDrawer = () => {
    const {setStage} = useUser();

    return (
        <div>
            <p onClick={() => setStage('login')}>Боба</p>
        </div>
    );
};

export const LoginDrawer = () => {
    const {setStage} = useUser();

    return (
        <div className="login_drawer">
            <h1>Войдите в личный кабинет</h1>
            <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            <p onClick={() => setStage('register')}>Биба</p>
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