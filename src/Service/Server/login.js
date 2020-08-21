export const loginUser = () => {
    const emailValue = document.getElementById('login_email').value;
    const passValue = document.getElementById('login_password').value;
    const url = 'https://miktina.herokuapp.com/backend/user/login.php?login&';
    const data = 'email=' + emailValue + '&password=' + passValue;
    return url + data;
};
