export const validateLogin = () => {
    const emailValue = document.getElementById('login_email').value;
    const passValue = document.getElementById('login_password').value;

    return emailValue.length && passValue.length;
};