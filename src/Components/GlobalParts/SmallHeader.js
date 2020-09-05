import React from 'react';
import {UserFeatures} from "./Header";
import {Link} from "react-router-dom";


const SmallMenu = () => {

    const handleMenuView = (e) => {
        const menu = document.getElementById('small_menu');
        if (e.target === menu || e.target === document.getElementById("small_menu_button"))
            menu.hidden = !menu.hidden;
    };

    const closeMenu = () => {
        const menu = document.getElementById('small_menu');
        menu.hidden = true;
    };

    return <div className="small_menu" id="small_menu_button" onClick={handleMenuView}>
        <div className="small_menu_drawer" id="small_menu" hidden={true}>
            <ul className="small_menu_ul">
                <li><Link to="/catalog" onClick={() => closeMenu()}>Онлайн-магазин</Link></li>
                <li><Link to="/delivery" onClick={() => closeMenu()}>Доставка</Link></li>
                <li><Link to="/contacts" onClick={() => closeMenu()}>Контакты</Link></li>
                <li><Link to="/about" onClick={() => closeMenu()}>О нас</Link></li>
                <li><Link to="/account" onClick={() => closeMenu()}>Аккаунт</Link></li>
                <li><Link to="/cart" onClick={() => closeMenu()}>Корзина</Link></li>
                <li><Link to="/wish" onClick={() => closeMenu()}>Список желаний</Link></li>
                <li><Link to="/about/policy" onClick={() => closeMenu()}>Оферта</Link></li>
                <h3><a href="tel:+79651278199">+7 965 127 81 99</a>
                    <br/>
                    <p>Miktina</p></h3>
            </ul>
        </div>
    </div>
};

export const SmallHeader = () => {

    return (<div className="header">
        <SmallMenu/>
        <Link to="/"><img className='logo'
                                                  src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/></Link>
        <UserFeatures/>
    </div>)
};