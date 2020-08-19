import React, {useLayoutEffect, useState} from 'react'
import Style from '../../Styles/GlobalStyle.css';
import {Link} from "react-router-dom";
import {useWishList} from "../../Service/Contexts/WishListContext";
import {useCart} from "../../Service/Contexts/CartContext";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {usePath} from "../../Service/Contexts/PathContext";
import {CartDrawer} from "../ShopParts/Cart/CartDrawer";
import {useUser} from "../../Service/Contexts/UserContext";
import {Account} from "../UserParts/Account";
import {AccountDrawer} from "../UserParts/AccountDrawer";


const UserFeatures = () => {
    const {countWishItems} = useWishList();
    const {countCartItems} = useCart();
    const {setStatus, status, close, setComponentRender, componentName, setComponentName} = useDrawer();
    const {user} = useUser();
    useLayoutEffect(() => {
        let cart = document.getElementById('cart');
        cart.addEventListener('auxclick', function (e) {
            if (e.button === 1) {
                window.open("/cart");
            }
        });
    });
    return (
        <ul className='user_features'>
            {user !== 'guest' ? <li onClick={() => close()}><Link to="/account"><img className="main_icon"
                                                                                     src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649302/user1_qptnba.png'/></Link>

                </li>
                : <li onClick={() => {
                    if (status === 'close') {
                        setComponentName('login');
                        setComponentRender(<AccountDrawer/>);
                        setStatus('open');
                    }
                    else if (status === 'open' && componentName === 'login')
                        setStatus('close');
                    else if (status === 'open' && componentName !== 'login') {
                        setComponentRender(<AccountDrawer/>);
                        setComponentName('login');
                    }
                }
                }><img className="main_icon"
                       src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649302/user1_qptnba.png'/>
                </li>
            }
            <li onClick={() => close()}><Link to="/wish"><img className="main_icon"
                                                              src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649366/heart_1_duwkep.png'/><span>({countWishItems})</span></Link>
            </li>
            <li onClick={() => {
                if (status === 'close') {
                    setComponentName('cart');
                    setComponentRender(<CartDrawer/>);
                    setStatus('open');
                }
                else if (status === 'open' && componentName === 'cart')
                    setStatus('close');
                else if (status === 'open' && componentName !== 'cart') {
                    setComponentRender(<CartDrawer/>);
                    setComponentName('cart');
                }
            }}><a id="cart" href="javascript:;"><img
                className="main_icon"
                src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649146/bag_fvitoi.png'/><span>({countCartItems})</span></a>
            </li>
        </ul>
    )
};

const Menu = () => {
    const {path} = usePath();
    const {close} = useDrawer();
    return (
        <ul className="menu">
            <Link to="/" onClick={() => close()}><img className='logo'
                                                      src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/></Link>
            <li className={path === '/catalog' ? 'menu_active' : null} onClick={() => {
                close()
            }}><Link
                to="/catalog">Онлайн магазин</Link></li>
            <li className={path === '/delivery' ? 'menu_active' : null} onClick={() => {
                close()
            }}>
                <Link to="/delivery">Доставка</Link></li>
            <li className={path === '/about' ? 'menu_active' : null} onClick={() => {
                close()
            }}><Link
                to="/about">О нас</Link></li>
            <li className={path === '/contacts' ? 'menu_active' : null} onClick={() => {
                close()
            }}>
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