export const updatePersonalField = async function (field) {
    const value = document.getElementById('personal_' + field + '_input').value;
    const token = JSON.parse(localStorage.getItem('user')).token;
    const url = 'https://miktina.herokuapp.com/backend/user/account.php?change&token=';
    const data = token + "&field=" + field + "&value=" + value;

    await fetch(url + data);
};