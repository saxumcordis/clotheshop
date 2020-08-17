import React, {useEffect} from 'react'
import {usePath} from "../../Service/PathContext";

const Cart = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/cart'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                wish
            </div>
        </div>
    )
};

export {Cart}