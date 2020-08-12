import React, {useState} from 'react';
import styles from "../../Styles/Drawer.css";
import {useDrawer} from "../../Service/Drawer";
export const Drawer = ({component, state}) => {
    const [drawerClass, setDrawerClass] = useState('side_drawer');
    const {close, status} = useDrawer();
    if (state === 'open' && !drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer open');
    if (state === 'close' && drawerClass.split(' ').includes('open'))
        setDrawerClass('side_drawer');
    return (
        <div className={"background_drawer " + status}>
            <div className={drawerClass}>
                <h1 style={{marginLeft: "50px"}}>Корзиночка</h1>
            </div>
        </div>
    );
};