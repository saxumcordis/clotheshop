import React from 'react'

const Wish = ({setPath}) => {
    setPath('/wish');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                wish
            </div>
        </div>
    )
};

export {Wish}