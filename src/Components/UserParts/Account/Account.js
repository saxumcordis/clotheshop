import React from 'react'
import {useUser} from "../../../Service/Contexts/UserContext";
import {PersonalEdit} from "./PersonalEdit";

const Account = () => {
    const {user, logout} = useUser();
    const logOut = () => {
        logout();
        window.location.reload();
    };

    if (user === 'guest')
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <p>Вы не авторизованы.</p>
                </div>
            </div>
        );
    else
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <div className='account_left'>
                    </div>
                    <div className='account_right'>
                        <div className="account_right_title">
                            <h1>Личный кабинет</h1>
                            <h3 onClick={() => logOut()}>Выход</h3>
                        </div>
                        <div className='account_right_personal'>
                            <p>Подчёркнутые поля можно изменить. Для изменения поля кликните на него.</p>
                            <PersonalEdit/>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export {Account};