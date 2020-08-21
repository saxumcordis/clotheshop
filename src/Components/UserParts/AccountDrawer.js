import {useUser} from "../../Service/Contexts/UserContext";
import React, {useLayoutEffect} from "react";
import {
    isPassConfirmed, validateBirthDate,
    validateEmail,
    validatePassword,
    validateRegister
} from "../../Service/Validation/registerValidation";
import {registerNewUser} from "../../Service/Server/register";
import {loginUser} from "../../Service/Server/login";
import {validateLogin} from "../../Service/Validation/loginValidation";


export const RestoreDrawer = () => {
    const {setStage} = useUser();
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Восстановление пароля</h1>
                <h3>Для восстановления пароля, пожалуйста, укажите Вашу электронную почту</h3>
            </div>
            <div className="login_form" style={{marginTop: "10px"}}>
                <input type="text" placeholder="Ваша электронная почта"/>
                <button className="login_button">Восстановить пароль</button>
            </div>
            <div className="switch_box" style={{marginTop: "30px"}}>
                <p className="switch_button" onClick={() => setStage('login')}>Вернуться назад</p>
            </div>
        </div>
    );
};

export const StatusRegisterDrawer = () => {
    const {stageStatus, setStageStatus, setStage} = useUser();
    const refreshStatus = () => {
        setTimeout(() => {
            setStage('register');
            setStageStatus(0);
        }, 4000);
        return null;
    };
    const messages = {
        1: ['Спасибо за регистрацию', 'Для активации Вашего профиля следуйте инструкциям, которые были высланы Вам на почту'],
        10: ['Пользователь с таким email существует', 'Заполните форму регистрации повторно, указав другой Email'],
        0: ['none', 'none']
    };
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>{messages[stageStatus][0]}</h1>
                <h3>{messages[stageStatus][1]}</h3>
                {stageStatus === 10 ? refreshStatus() : null}
            </div>
        </div>
    );

};

export const StatusLoginDrawer = () => {
    const {stageStatus, setStageStatus, setUser, setStage} = useUser();
    const refreshStatus = () => {
        setTimeout(() => {
            setStageStatus(0);
            window.location = "/catalog";
        }, 3000);
        return null;
    };
    const backToLogin = () => {
        setTimeout(() => {
            setStageStatus(0);
            setStage('login');
        }, 3000);
    };
    if (stageStatus.token) {
        setUser(stageStatus);
        refreshStatus();
        return (
            <div className="login_drawer">
                <div className="login_drawer_title">
                    <h1>Вход выполнен успешно</h1>
                    <h3>Сейчас Вы будете перенаправлены на главную страницу</h3>
                </div>
            </div>
        );
    }
    else if (stageStatus === -3)
        return (
            <div className="login_drawer">
                <div className="login_drawer_title">
                    <h1>Ваша учётная запись не была активирована</h1>
                    <h3>Чтобы активировать учётную запись, следуйте инструкциям из письма, отправленного на Вашу почту</h3>
                    <p>Не получали письмо? Проверьте папку "Спам". В случае его отсутствия запросите письмо заново</p>
                </div>
            </div>
        );
    else if (stageStatus === -20) {
        backToLogin();
        return (
            <div className="login_drawer">
                <div className="login_drawer_title">
                    <h1>Пользователь с такими данными не существует</h1>
                    <h3>Повторите попытку, внимательно проверив Ваши Email и пароль</h3>
                </div>
            </div>
        );
    }
    else
        return <></>

};

export const RegisterDrawer = () => {
    const {setStage, stageStatus, setStageStatus} = useUser();

    const sendRegister = () => {
        const data = registerNewUser();
        (async () => {
            const response = await fetch(data);
            if (!stageStatus) {
                setStageStatus(await response.json());
            }
        })();
    };

    useLayoutEffect(() => {
        let form = document.getElementById('register_form');
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            if (validateRegister()) {
                sendRegister();
                setTimeout(() => setStage('registered'), 1000);
                return;
            } else return;
        });
    });
    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Зарегистрируйтесь на MIKTINA</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form" style={{marginTop: "10px"}}>
                <form id="register_form" method="post" style={{width: "222px"}}>
                    <input type="email" id="register_email" placeholder="Email" name="register_email"
                           onChange={() => validateEmail()}/>
                    <input type="text" id="register_name" placeholder="Имя" name="register_name"/>
                    <input type="text" id="register_surname" placeholder="Фамилия" name="register_surname"/>
                    <input type="text" id="register_phone" placeholder="+_ (___) ___-__-__" name="register_phone"/>
                    <input type="date" id="register_birth_date" placeholder="Дата рождения"
                           name="register_birth_date"
                           min="1900-01-01" max="2020-01-01" onChange={() => validateBirthDate()}/>
                    <input type="password" id="register_pass" placeholder="Пароль" name="register_pass"
                           onChange={() => validatePassword()}/>
                    <input type="password" id="register_confirm_pass" placeholder="Повторите пароль"
                           name="register_confirm_pass" onChange={() => isPassConfirmed()}/>
                    <input type="submit" value="Зарегистрироваться" style={{color: "white"}}
                           onClick={() => validateRegister()} className="login_button"/>
                </form>
            </div>
            <div className="switch_box">
                <p className="switch title">Вы наш клиент?</p>
                <p className="switch_button" onClick={() => setStage('login')}>ВОЙДИТЕ В ЛИЧНЫЙ КАБИНЕТ</p>
            </div>
        </div>
    );
};

export const LoginDrawer = () => {
    const {setStage, stageStatus, setStageStatus} = useUser();

    const sendLogin = () => {
        const data = loginUser();
        (async () => {
            const response = await fetch(data);
            if (!stageStatus) {
                setStageStatus(await response.json());
            }
        })();
    };

    useLayoutEffect(() => {
        let form = document.getElementById('login_form');
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            if (validateLogin()) {
                sendLogin();
                setTimeout(() => setStage('logged'), 1000);
                return;
            } else return;
        });
    });

    return (
        <div className="login_drawer">
            <div className="login_drawer_title">
                <h1>Войдите в личный кабинет</h1>
                <h3>ДЛЯ ДОСТУПА К ВАШИМ ЗАКАЗАМ, ОТЛОЖЕННЫМ ТОВАРАМ И БЫСТРОЙ ПОКУПКЕ</h3>
            </div>
            <div className="login_form">
                <form style={{width: "222px"}} method="post" id="login_form">
                    <input type="email" id="login_email" placeholder="Email" name="user_login" required/>
                    <input type="password" id="login_password" placeholder="Пароль" name="user_pass" required/>
                    <p className="lost_password_link" onClick={() => setStage('restore')}>Забыли пароль?</p>
                    <input type="submit" style={{color: "white"}} className="login_button" value="Войти"
                           onClick={() => validateLogin()}/>
                </form>
            </div>
            <div className="switch_box">
                <p className="switch title"> У вас ещё нет аккаунта?</p>
                <p className="switch_button" onClick={() => setStage('register')}>ЗАРЕГИСТРИРУЙТЕСЬ</p>
            </div>
        </div>
    );
};

export const AccountDrawer = () => {
    const {stage} = useUser();
    return (
        <div className="account_drawer">
            {stage === 'login' ? <LoginDrawer/>
                : stage === 'register' ? <RegisterDrawer/>
                    : stage === 'registered' ? <StatusRegisterDrawer/>
                    : stage === 'logged' ? <StatusLoginDrawer/>
                        : <RestoreDrawer/>}
        </div>
    )
};