import React, {useEffect} from "react";
import {usePath} from "../../Service/Contexts/PathContext";

export const Policy = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/about'));

    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className='delivery_box'>
                    <h1>Публичная оферта</h1>
                    <p>Тут будет техт</p>
                </div>
            </div>
        </div>
    );
};