import React, {useEffect, useLayoutEffect, useState} from 'react'
//import Style from '../../Styles/GlobalStyle.css';
import {Link, useLocation} from "react-router-dom";
import {useWishList} from "../../Service/Contexts/WishListContext";
import {useCart} from "../../Service/Contexts/CartContext";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {CartDrawer} from "../ShopParts/Cart/CartDrawer";
import {useUser} from "../../Service/Contexts/UserContext";
import {AccountDrawer} from "../UserParts/AccountDrawer";
import {useMedia} from "use-media";
import {SmallHeader} from "./SmallHeader";


export const UserFeatures = () => {
    const {countWishItems} = useWishList();
    const {countCartItems} = useCart();
    const {setStatus, status, close, setComponentRender, componentName, setComponentName} = useDrawer();
    const {user} = useUser();

   // const isDesktop = useMedia('screen and (min-width: 960px)');

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
            <li onClick={1 ? () => {
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
            } : null}><a id="cart" href={1 ? "javascript:;" : "/cart"}><img
                className="main_icon"
                src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649146/bag_fvitoi.png'/><span>({countCartItems})</span></a>
            </li>
        </ul>
    )
};

const Menu = () => {
    const location = useLocation();
    const {close} = useDrawer();

    return (
        <ul className="menu">
            <Link to="/" onClick={() => close()}><img className='logo'
                                                      src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/></Link>
            <li className={location.pathname === '/catalog' ? 'menu_active' : null} onClick={() => {
                close()
            }}><Link
                to="/catalog">Онлайн магазин</Link></li>
            <li className={location.pathname === '/delivery' ? 'menu_active' : null} onClick={() => {
                close()
            }}>
                <Link to="/delivery">Доставка</Link></li>
            <li className={location.pathname === '/about' ? 'menu_active' : null} onClick={() => {
                close()
            }}><Link
                to="/about">О нас</Link></li>
            <li className={location.pathname === '/contacts' ? 'menu_active' : null} onClick={() => {
                close()
            }}>
                <Link to="/contacts">Контакты</Link></li>
            {1 ?
            <li><a href="tel:+79651278199">+7 965 127 81 99</a></li>
                : null }
        </ul>
    )
};

const Header = () => {
    //const isDesktop = useMedia('screen and (min-width: 960px)');
    return ( 1 ?
        <div className="header">
            <Menu/>
            <UserFeatures/>
        </div>
            : <SmallHeader/>
    )
};


export {Header};