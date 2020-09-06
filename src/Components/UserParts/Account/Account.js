import React from 'react'
import {useUser} from "../../../Service/Contexts/UserContext";
import {PersonalEdit} from "./PersonalEdit";
import {AddressEdit} from "./AddressEdit";
import {useDrawer} from "../../../Service/Contexts/Drawer";
import {AccountDrawer} from "../AccountDrawer";

const Account = () => {
    const {user, logout} = useUser();
    const {setStatus,status, setComponentRender, setComponentName} = useDrawer();
    const logOut = () => {
        logout();
        window.location.reload();
    };

    if (user === 'guest' && status !== 'open') {
        setComponentName('login');
        setComponentRender(<AccountDrawer/>);
        setStatus('open');
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <div className="not_logged">
                        <p>Авторизация</p>
                    </div>
                </div>
            </div>
        );
    }
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
                        <div className='account_right_address'>
                            <div className="account_right_title">
                                <h1><strong>Адрес доставки</strong></h1>
                            </div>
                            <p className="address_warning" id="address_warning">Внимательно заполните все поля. Если поле остаётся пустым, <u>оставьте прочерк</u>.</p>
                            <AddressEdit/>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export {Account};