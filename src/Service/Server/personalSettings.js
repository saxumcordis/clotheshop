import {checkFilling} from "../Validation/addressValidation";

export const updatePersonalField = async function (field, update=null) {
    const value = document.getElementById('personal_' + field + '_input').value;
    const personal = JSON.parse(localStorage.getItem('personal'));
    if (field !== 'password') {
        personal[field] = value;
        localStorage.setItem('personal', JSON.stringify(personal));
        update(personal);
    }
    const token = JSON.parse(localStorage.getItem('user')).token;
    const url = 'https://miktina.herokuapp.com/backend/user/account.php?change&token=';
    const data = token + "&field=" + field + "&value=" + value;

    await fetch(url + data);
};

const updatePersonalAddress = (update, data) => {
    const personal = JSON.parse(localStorage.getItem('personal'));
    for (let field in data) {
        if (personal.hasOwnProperty(field) && field !== 'id')
            personal[field] = data[field];
    }
    localStorage.setItem('personal', JSON.stringify(personal));
    update(personal);
};


export const updateAddress = async function (id, update) {
    if (!window.confirm("Подтвердите изменение адреса")) {
        return 0;
    }
    if (!checkFilling())
        return 0;
    const data = {
        id: id,
        country: document.getElementById('address_country').value || document.getElementById('address_country').placeholder,
        city: document.getElementById('address_city').value || document.getElementById('address_city').placeholder,
        street: document.getElementById('address_street').value || document.getElementById('address_street').placeholder,
        postal_code: document.getElementById('address_postal_code').value || document.getElementById('address_postal_code').placeholder,
        house: document.getElementById('address_house').value || document.getElementById('address_house').placeholder,
        block: document.getElementById('address_block').value || document.getElementById('address_block').placeholder,
        flat: document.getElementById('address_flat').value || document.getElementById('address_flat').placeholder,
        phone: document.getElementById('address_phone').value || document.getElementById('address_phone').placeholder,
    };
    const token = JSON.parse(localStorage.getItem('user')).token;
    const url = 'https://miktina.herokuapp.com/backend/user/account.php?address&new&token=';
    const convertedData = url + token + "&address_id=" + data.id + "&country=" + data.country + "&city=" + data.city
        + "&street=" + data.street + "&postal_code=" + data.postal_code + "&house=" + data.house + "&block=" + data.block
        + "&flat=" + data.flat + "&phone=" + data.phone;
    updatePersonalAddress(update, data);
    await fetch(convertedData);
};