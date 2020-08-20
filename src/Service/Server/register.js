import {useUser} from "../Contexts/UserContext";
import React from "react";

export const registerNewUser = () => {
    const passwordValue = document.getElementById('register_pass').value;
    const confirmValue = document.getElementById('register_confirm_pass').value;
    const emailValue = document.getElementById('register_email').value;
    const nameValue = document.getElementById('register_name').value;
    const surnameValue = document.getElementById('register_surname').value;
    const birthDayValue = document.getElementById('register_birth_date').value;
    const phoneValue = document.getElementById('register_phone').value;
    const url = "https://miktina.herokuapp.com/backend/user/register.php?register&";
    const data = {
        name: nameValue,
        surname: surnameValue,
        phone: phoneValue,
        email: emailValue,
        birth: birthDayValue,
        pass: passwordValue,
        confirmPass: confirmValue,
    };
    const convertData = "name=" + data.name + "&surname=" + data.surname + "&phone=" + data.phone + "&email=" + data.email
        + "&birth=" + data.birth + "&password=" + data.pass + "&confirm_password=" + data.confirmPass;
    return url + convertData;

};
