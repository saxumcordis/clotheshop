import React from 'react'
import {Header} from '../GlobalParts/Header'

const Contacts = ({setPath}) => {
    setPath('/contacts');
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                Contacts
            </div>
        </div>
    )
};


export {Contacts};