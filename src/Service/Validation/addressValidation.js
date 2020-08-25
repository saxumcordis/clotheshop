import {alertRedInput, defaultInput} from "./registerValidation";

export const checkFilling = () => {
    let status = 1;
    const warning = document.getElementById('address_warning');
    const addressFields = {
        country: document.getElementById('address_country'),
        city: document.getElementById('address_city'),
        street: document.getElementById('address_street'),
        zip: document.getElementById('address_zip'),
        building: document.getElementById('address_building'),
        pavilion: document.getElementById('address_pavilion'),
        flat: document.getElementById('address_flat'),
        phone: document.getElementById('address_phone'),
    };

    for (let field in addressFields) {
        if (!addressFields[field].value && !addressFields[field].placeholder) {
            addressFields[field].style.borderColor = alertRedInput;
            status = 0;
        }
        else
            addressFields[field].style.borderColor = defaultInput;
    }
    if (!status) {
        warning.style.color = "#FF0000";
    }
    else {
        warning.style.color = "#999";
    }
    return status;
};