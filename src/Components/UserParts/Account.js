import React, {useEffect} from 'react'
import {usePath} from "../../Service/Contexts/PathContext";
import {useUser} from "../../Service/Contexts/UserContext";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {AccountDrawer} from "./AccountDrawer";

const Account = () => {
    const {setPath} = usePath();
    const {user, setStage, logout, personal, setPersonal} = useUser();
    console.log(personal);
    const {setStatus, status, close, setComponentRender, componentName, setComponentName} = useDrawer();
    useEffect(() => {
        setPath('/account');

    }, [setPath]);

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
                            <div className='account_right_personal_edit'>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Имя:</span>
                                    <span className='personal_field value'>{personal.name}</span>
                                </p>
                                <form className="personal_edit_form">
                                    <p className="">
                                        <label>Новое имя</label>
                                        <input required="" type="text" name="NAME" value="SOSIK"
                                               data-place="SOSIK" className=""/>
                                    </p>
                                    <input type="submit" value="Сохранить"/>
                                </form>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Фамилия:</span>
                                    <span className='personal_field value'>{personal.surname}</span>
                                </p>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Логин:</span>
                                    <span className='personal_field'>{personal.email}</span>
                                </p>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Пароль:</span>
                                    <span className='personal_field value'>********</span>
                                </p>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Дата рождения</span>
                                    <span className='personal_field value'>{personal.birth}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export {Account};