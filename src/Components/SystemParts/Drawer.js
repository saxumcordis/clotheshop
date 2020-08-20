import React, {useState} from 'react';
import styles from "../../Styles/Drawer.css";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {CartDrawer} from "../ShopParts/Cart/CartDrawer";
import {usePath} from "../../Service/Contexts/PathContext";

export const Drawer = ({state}) => {
    const {path} = usePath();
    const {componentName} = useDrawer();
    const [drawerClass, setDrawerClass] = useState('side_drawer');
    const {status, close, component} = useDrawer();
    if (state === 'open' && !drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer open');
    if (state === 'close' && drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer');

    const handleClick = event => {
        if (event.target === document.getElementById('cart_drawer'))
            close();
    };
    if (path !== '/cart' || componentName !== 'cart')
        return (
            <div className={"background_drawer " + status} id="cart_drawer" onClick={handleClick}>
                <div className={drawerClass}>
                    {component}
                </div>
            </div>
        );
    else
        return null;
};