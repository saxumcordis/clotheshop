import React from 'react'
import {useUser} from "../../Service/Contexts/UserContext";
import {validatePassword} from "../../Service/Validation/registerValidation";
import {updatePersonalField} from "../../Service/Server/personalSettings";

const setPersonalFormView = (id) => {
    const form = document.getElementById(id);
    form.style.display = form.hidden ? 'block' : 'none';
    form.hidden = !form.hidden;
};

const Account = () => {
    const {user, logout, personal} = useUser();
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
                                    <span className='personal_field value'
                                          onClick={() => setPersonalFormView('personal_name')}>{personal.name}</span>
                                </p>
                                <div className="personal_edit_form"id="personal_name" hidden>
                                    <p className="personal_edit_text">
                                        <label>Новое имя</label>
                                        <input required type="text" name="NAME" id="personal_name_input"/>
                                    </p>
                                    <button className="personal_button" onClick={() => {updatePersonalField('name')}}>Сохранить</button>
                                </div>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Фамилия:</span>
                                    <span className='personal_field value' onClick={() => setPersonalFormView('personal_surname')}>{personal.surname}</span>
                                </p>
                                <div className="personal_edit_form" id="personal_surname" hidden>
                                    <p className="personal_edit_text">
                                        <label>Новая фамилия</label>
                                        <input required type="text" name="SURNAME" id="personal_surname_input"/>
                                    </p>
                                    <button className="personal_button" onClick={() => {updatePersonalField('surname')}}>Сохранить</button>
                                </div>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Логин:</span>
                                    <span className='personal_field'>{personal.email}</span>
                                </p>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Пароль:</span>
                                    <span className='personal_field value' onClick={() => setPersonalFormView('personal_password')}>********</span>
                                </p>
                                <div className="personal_edit_form" id="personal_password" hidden>
                                    <p className="personal_edit_text">
                                        <label>Новый пароль</label>
                                        <span>Должен содержать от 7 до 15 символов, включать в себя буквы нижнего, верхнего регистров, цифру и спец.символ</span>
                                        <input required type="password" id="personal_password_input" name="PASSWORD" onChange={() => validatePassword('personal_password_input')}/>
                                    </p>
                                    <button className="personal_button" onClick={() => {if (validatePassword('personal_password_input')) updatePersonalField('password')}}>Сохранить</button>
                                </div>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Дата рождения</span>
                                    <span className='personal_field'>{personal.birth}</span>
                                </p>
                                <p className='account_right_personal_field'>
                                    <span className='personal_field'>Телефон</span>
                                    <span className='personal_field value' onClick={() => setPersonalFormView('personal_phone')}>{personal.phone}</span>
                                </p>
                                <div className="personal_edit_form" id="personal_phone" hidden>
                                    <p className="personal_edit_text">
                                        <label>Новый телефон</label>
                                        <input required type="text" name="PHONE" id="personal_phone_input"/>
                                    </p>
                                    <button className="personal_button" onClick={() => {updatePersonalField('phone')}}>Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export {Account};