import React, {useEffect} from 'react'
import {usePath} from "../../Service/PathContext";

const Cart = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/cart'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="cart_box">
                    <h1>Ваша корзина</h1>
                </div>
            </div>
        </div>
    )
};

export {Cart}