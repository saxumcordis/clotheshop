import {useUser} from "../../../Service/Contexts/UserContext";
import {updatePersonalField} from "../../../Service/Server/personalSettings";
import {validatePassword} from "../../../Service/Validation/registerValidation";
import React from "react";

const setPersonalFormView = (id) => {
    const form = document.getElementById(id);
    form.style.display = form.hidden ? 'block' : 'none';
    form.hidden = !form.hidden;
};




export const PersonalEdit = () => {
    const {personal, setPersonal} = useUser();
    return (
        <div className='account_right_personal_edit'>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Имя:</span>
                <span className='personal_field value'
                      onClick={() => setPersonalFormView('personal_name')}>{personal.name}</span>
            </p>
            <div className="personal_edit_form" id="personal_name" hidden>
                <p className="personal_edit_text">
                    <label>Новое имя</label>
                    <input required type="text" name="NAME" id="personal_name_input"/>
                </p>
                <button className="personal_button" onClick={() => {
                    updatePersonalField('name', setPersonal)
                }}>Сохранить
                </button>
            </div>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Фамилия:</span>
                <span className='personal_field value'
                      onClick={() => setPersonalFormView('personal_surname')}>{personal.surname}</span>
            </p>
            <div className="personal_edit_form" id="personal_surname" hidden>
                <p className="personal_edit_text">
                    <label>Новая фамилия</label>
                    <input required type="text" name="SURNAME" id="personal_surname_input"/>
                </p>
                <button className="personal_button" onClick={() => {
                    updatePersonalField('surname', setPersonal)
                }}>Сохранить
                </button>
            </div>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Логин:</span>
                <span className='personal_field'>{personal.email}</span>
            </p>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Пароль:</span>
                <span className='personal_field value'
                      onClick={() => setPersonalFormView('personal_password')}>********</span>
            </p>
            <div className="personal_edit_form" id="personal_password" hidden>
                <p className="personal_edit_text">
                    <label>Новый пароль</label>
                    <span>Должен содержать от 7 до 15 символов, включать в себя буквы нижнего, верхнего регистров, цифру и спец.символ</span>
                    <input required type="password" id="personal_password_input" name="PASSWORD"
                           onChange={() => validatePassword('personal_password_input')}/>
                </p>
                <button className="personal_button" onClick={() => {
                    if (validatePassword('personal_password_input')) updatePersonalField('password', setPersonal)
                }}>Сохранить
                </button>
            </div>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Дата рождения</span>
                <span className='personal_field'>{personal.birth}</span>
            </p>
            <p className='account_right_personal_field'>
                <span className='personal_field'>Телефон</span>
                <span className='personal_field value'
                      onClick={() => setPersonalFormView('personal_phone')}>{personal.phone}</span>
            </p>
        </div>
    )
};