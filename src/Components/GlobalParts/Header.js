import React from 'react'
import Style from '../../Styles/GlobalStyle.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Catalog} from '../ShopParts/Catalog/Catalog';
import {Account} from '../UserParts/Account';
import {Delivery} from '../UtilParts/Delivery';
import {About} from '../UtilParts/About';
import {Contacts} from '../UtilParts/Contacts';
import {Wish} from '../UserParts/Wish';
import {Cart} from '../UserParts/Cart';

const UserFeatures = ({counter}) => {
    return (
        <ul className='user_features'>
            <li><Link to="/account"><img className="main_icon"
                                         src='https://simpleicon.com/wp-content/uploads/user1.png'/></Link></li>
            <li><Link to="/wish"><img className="main_icon"
                                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Heart_font_awesome.svg/1200px-Heart_font_awesome.svg.png'/><span>({counter.wish})</span></Link>
            </li>
            <li><Link to="/cart"><img className="main_icon"
                                      src='https://lh3.googleusercontent.com/proxy/yE8_mbGONouTk-P-Xg_7lVDccGTguKXaJU54N1pUm3V7D52Ecmg6WTRxhLSLaIz95LNah4a2qSm-WRV8SWMqR-VKWxY_ntFv1YDTWwYJA70TqdB5kV5f'/><span>({counter.cart})</span></Link>
            </li>
        </ul>
    )
}

const Menu = () => {
    return (
            <ul className="menu">
                <li><Link to="/catalog">Онлайн-магазин</Link></li>
                <li><Link to="/delivery">Доставка</Link></li>
                <li><Link to="/about">О нас</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
                <li>+7 965 127 81 99</li>
            </ul>
    )
};


const Header = () => {
    return (
        <div className="header">
            <Link to="/"><img className='logo' src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/></Link>
            <Menu counter={{wish: 5, cart: 2}}/>
            <UserFeatures counter={{wish: 5, cart: 2}}/>
        </div>
    )
};


export {Header};