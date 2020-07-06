import React from 'react'

const Delivery = ({setPath}) => {
    setPath('/delivery');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                delivery
            </div>
        </div>
    )
};


export {Delivery}