import React from 'react'
import {Link} from "react-router-dom";

const CatalogMenu = () => {
    return (
        <div className="catalog_menu">
            <ul className="catalog_categories">
                <li><Link to='/catalog'>КАТАЛОГ</Link></li>
                <li className='catalog_category'>Костюмы</li>
            </ul>
        </div>
    )
};

export {CatalogMenu};