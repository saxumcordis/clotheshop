import React, {useEffect} from 'react'
import {usePath} from "../../Service/PathContext";

const Account = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/account'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                account
            </div>
        </div>
    )
}

export {Account};