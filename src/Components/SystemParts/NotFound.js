import React, {useEffect} from 'react';
import {usePath} from "../../Service/Contexts/PathContext";


const NotFound = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('notFound'));
    return (
        <div className='with_footer'>
            <div className="global_giv">
                <div className="product">
                    <h1>Не найдено</h1>
                </div>
            </div>
        </div>
    )
};

export {NotFound};