import React, {useState} from 'react';


const NotFound = ({setPath}) => {
    setPath('notFound');
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