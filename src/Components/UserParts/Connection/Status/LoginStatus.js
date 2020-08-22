import {useUser} from "../../../../Service/Contexts/UserContext";
import React, {useCallback} from "react";
import {carryLoginData, hideEmail} from "../../../../Service/Server/login";
import {useCart} from "../../../../Service/Contexts/CartContext";
import {useWishList} from "../../../../Service/Contexts/WishListContext";

export const StatusLoginDrawer = () => {
    const {stageStatus, setStageStatus, setUser, setStage} = useUser();
    const {setCart} = useCart();
    const {setWishList} = useWishList();
    const loginEmail = useCallback(carryLoginData('get'), [setUser]);
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
    const initCart = async (token) => {
        fetch('https://miktina.herokuapp.com/backend/user/storage.php?get_cart&token=' + token).then(response => response.json()).then(response => setCart(response));
    };
    const initWish = async (token) => {
        fetch('https://miktina.herokuapp.com/backend/user/storage.php?get_wish&token=' + token).then(response => response.json()).then(response => setWishList(response));
    };
    if (stageStatus.token) {
        initCart(stageStatus.token);
        initWish(stageStatus.token);
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
    } else if (stageStatus === -3)
        return (
            <div className="login_drawer">
                <div className="login_drawer_title">
                    <h1>Ваша учётная запись не была активирована</h1>
                    <h3>Чтобы активировать учётную запись, следуйте инструкциям из письма, отправленного на Вашу
                        почту {hideEmail(loginEmail)}</h3>
                    <p>Не получали письмо? Проверьте папку "Спам". В случае его отсутствия <span
                        className="switch_button">запросите письмо заново</span></p>
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
    } else
        return <></>

};
