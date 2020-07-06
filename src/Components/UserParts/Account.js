import React from 'react'

const Account = ({setPath}) => {
    setPath('/account');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                account
            </div>
        </div>
    )
}

export {Account};