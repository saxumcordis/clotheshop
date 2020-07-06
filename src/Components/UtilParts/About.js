import React from 'react'

const About = ({setPath}) => {
    setPath('/about');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                about
            </div>
        </div>
    )
};


export {About};