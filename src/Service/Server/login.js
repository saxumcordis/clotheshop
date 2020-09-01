export const loginUser = () => {
    const emailValue = document.getElementById('login_email').value;
    const passValue = document.getElementById('login_password').value;
    const url = 'https://miktina.herokuapp.com/backend/user/login.php?login&';
    const data = 'email=' + emailValue + '&password=' + passValue;
    return url + data;
};

export const loginAdmin = () => {
    const emailValue = document.getElementById('login_email').value;
    const passValue = document.getElementById('login_password').value;
    const url = 'https://miktina.herokuapp.com/backend/user/admin.php?login&';
    const data = 'email=' + emailValue + '&password=' + passValue;
    return url + data;
};

export const carryLoginData = (method) => {
    if (method === 'set')
    localStorage.setItem('login_email', JSON.stringify(document.getElementById('login_email').value));
    else if (method === 'get') {
        const login = JSON.parse(localStorage.getItem('login_email'));
        setTimeout(() => localStorage.removeItem('login_email'), 10000);
        return login;
    }
};

export const hideEmail = (email) => {
    return email.replace(/(?<=^.).+(?=.@.+)/, v => '*'.repeat(v.length))
};