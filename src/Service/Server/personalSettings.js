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