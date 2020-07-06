import React from 'react'

const Cart = ({setPath}) => {
    setPath('/cart');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                wish
            </div>
        </div>
    )
};

export {Cart}