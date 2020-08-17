import React, {useState} from 'react';
import styles from "../../Styles/Drawer.css";
import {useDrawer} from "../../Service/Drawer";
import {CartDrawer} from "../ShopParts/Cart/CartDrawer";
import {usePath} from "../../Service/PathContext";

export const Drawer = ({state}) => {
    const {path} = usePath();
    const [drawerClass, setDrawerClass] = useState('side_drawer');
    const {status, close} = useDrawer();
    if (state === 'open' && !drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer open');
    if (state === 'close' && drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer');

    const handleClick = event => {
        if (event.target === document.getElementById('cart_drawer'))
            close();
    };
    if (path !== '/cart')
        return (
            <div className={"background_drawer " + status} id="cart_drawer" onClick={handleClick}>
                <div className={drawerClass}>
                    <h1 className="title_drawer_cart">Ваша корзина</h1>
                    <CartDrawer/>
                </div>
            </div>
        );
    else
        return null;
};