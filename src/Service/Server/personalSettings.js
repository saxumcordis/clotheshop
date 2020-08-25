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
};

export const updateAddress = async function (id, update) {
    if (!window.confirm("Подтвердите изменение адреса")) {
        return 0;
    }
    const data = {
        id: id,
        country: document.getElementById('address_country').value || document.getElementById('address_country').placeholder,
        city: document.getElementById('address_city').value || document.getElementById('address_city').placeholder,
        street: document.getElementById('address_street').value || document.getElementById('address_street').placeholder,
        zip: document.getElementById('address_zip').value || document.getElementById('address_zip').placeholder,
        building: document.getElementById('address_building').value || document.getElementById('address_building').placeholder,
        pavilion: document.getElementById('address_pavilion').value || document.getElementById('address_pavilion').placeholder,
        flat: document.getElementById('address_flat').value || document.getElementById('address_flat').placeholder,
        phone: document.getElementById('address_phone').value || document.getElementById('address_phone').placeholder,
    };
    const token = JSON.parse(localStorage.getItem('user')).token;
    const url = 'https://miktina.herokuapp.com/backend/user/account.php?address&new&token=';
    const convertedData = url + token + "&address_id=" + data.id + "&country=" + data.country + "&city=" + data.city
        + "&street=" + data.street + "&zip=" + data.zip + "&building=" + data.building + "&pavilion=" + data.pavilion
        + "&flat=" + data.flat + "&phone=" + data.phone;
    updatePersonalAddress(update, data);
    await fetch(convertedData);
};