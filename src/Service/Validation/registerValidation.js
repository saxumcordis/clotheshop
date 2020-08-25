export const alertRedInput = "#ff0000";
export const defaultInput = "#e1e1e1";

export const validateEmail = () => {
    const emailInput = document.getElementById('register_email');
    const emailValue = emailInput.value;
    if (!/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/.test(emailValue)) {
        emailInput.style.borderColor = alertRedInput;
        return 0;
    }
    else {
        emailInput.style.borderColor = defaultInput;
        return 1;
    }
};

export const validatePassword = (id) => {
    const passwordInput = document.getElementById(id);
    const passwordValue = passwordInput.value;
    let issueArr = [];
    if (!/^.{7,15}$/.test(passwordValue))
        issueArr.push("Длина пароля должна составлять от 7 до 15 символов.");
    if (!/\d/.test(passwordValue))
        issueArr.push("Должна быть хотя бы 1 цифра.");
    if (!/[a-zа-я]/.test(passwordValue))
        issueArr.push("Должна быть хотя бы 1 маленькая буква.");
    if (!/[A-ZА-Я]/.test(passwordValue))
        issueArr.push("Должна быть хотя бы 1 заглавная буква.");
    if (!/(?=.*[@$!%*?&])/.test(passwordValue))
        issueArr.push("Должен содержаться хотя бы один из символов @$!%*?&");
    if (issueArr.length > 0) {
        passwordInput.setCustomValidity(issueArr.join("\n"));
        passwordInput.style.borderColor = alertRedInput;
        return 0;
    } else {
        passwordInput.setCustomValidity("");
        passwordInput.style.borderColor = defaultInput;
        return 1;
    }
};

export const isPassConfirmed = () => {
    const passwordInput = document.getElementById('register_pass');
    const passwordValue = passwordInput.value;
    const confirmInput = document.getElementById('register_confirm_pass');
    const confirmValue = confirmInput.value;
    let issueArr = [];
    if (passwordValue !== confirmValue)
        issueArr.push('Пароли не совпадают.');
    if (issueArr.length > 0) {
        confirmInput.setCustomValidity(issueArr.join("\n"));
        confirmInput.style.borderColor = alertRedInput;
        return 0;
    } else {
        confirmInput.setCustomValidity("");
        confirmInput.style.borderColor = defaultInput;
        return 1;
    }
};

export const validateBirthDate = () => {
    const birthDateInput = document.getElementById('register_birth_date');
    const birthDateValue = birthDateInput.value;
    let issueArr = [];
    if (!birthDateValue)
        issueArr.push('Вы не указали дату рождения.');
    if (issueArr.length > 0) {
        birthDateInput.setCustomValidity(issueArr.join("\n"));
        birthDateInput.style.borderColor = alertRedInput;
        return 0;
    }
    else {
        birthDateInput.setCustomValidity("");
        birthDateInput.style.borderColor = defaultInput;
        return 1;
    }
}

export const validateRegister = () => {
    if (validateEmail() && validatePassword('register_pass') && isPassConfirmed() && validateBirthDate())
        return 1;
};