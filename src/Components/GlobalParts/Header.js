import React, {useContext, useEffect, useLayoutEffect, useState} from 'react'
import Style from '../../Styles/GlobalStyle.css';
import {Link} from "react-router-dom";
import {useWishList} from "../../Service/WishListContext";
import {useCart} from "../../Service/CartContext";
import {Drawer} from "../SystemParts/Drawer";
import {useDrawer} from "../../Service/Drawer";

const cartHandler = (e) => {
    if (e.which === 2) {
        e.preventDefault();
        return <Link to="/cart"/>
    }
};

const UserFeatures = () => {
    const {wishList} = useWishList();
    const {cart} = useCart();
    const {setStatus, status} = useDrawer();
    useLayoutEffect(() => {
        let cart = document.getElementById('cart');
        cart.addEventListener('auxclick', function(e) {
            if (e.button === 1) {
                window.open("/cart");
            }
        });
    });
    return (
        <ul className='user_features'>
            <li><Link to="/account"><img className="main_icon"
                                         src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649302/user1_qptnba.png'/></Link>
            </li>
            <li><Link to="/wish"><img className="main_icon"
                                      src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649366/heart_1_duwkep.png'/><span>({wishList.length})</span></Link>
            </li>
            <li onClick={() => setStatus(status === 'open' ? 'close' : 'open')}><a id="cart" href="javascript:;"><img
                className="main_icon"
                src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649146/bag_fvitoi.png'/><span>({cart.length ? cart.map(e => e.quantity).reduce((a, b) => a + b) : 0})</span></a>
            </li>
        </ul>
    )
};

const Menu = () => {
    const [currentLink, setLink] = useState(window.location.pathname);
    return (
        <ul className="menu">
            <Link to="/"><img className='logo' onClick={() => setLink('/')}
                              src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/></Link>
            <li className={currentLink === '/catalog' ? 'menu_active' : null} onClick={() => setLink('/catalog')}><Link
                to="/catalog">Онлайн магазин</Link></li>
            <li className={currentLink === '/delivery' ? 'menu_active' : null} onClick={() => setLink('/delivery')}>
                <Link to="/delivery">Доставка</Link></li>
            <li className={currentLink === '/about' ? 'menu_active' : null} onClick={() => setLink('/about')}><Link
                to="/about">О нас</Link></li>
            <li className={currentLink === '/contacts' ? 'menu_active' : null} onClick={() => setLink('/contacts')}>
                <Link to="/contacts">Контакты</Link></li>
            <li><a href="tel:+79651278199">+7 965 127 81 99</a></li>
        </ul>
    )
};


const Header = () => {
    return (
        <div className="header">
            <Menu/>
            <UserFeatures/>
        </div>
    )
};


export {Header};