import React from 'react'
import {Link} from "react-router-dom";

const CatalogMenu = () => {
    return (
        <div className="catalog_menu">
            <ul className="catalog_categories">
                <li><Link to='/catalog'>КАТАЛОГ</Link></li>
                <li className='catalog_category'><Link to='/catalog/category/1'>Костюмы длинные</Link></li>
                <li className='catalog_category'><Link to='/catalog/category/2'>Костюмы короткие</Link></li>
                <li className='catalog_category'><Link to='/catalog/category/sale' style={{color: "red"}}>SALE</Link></li>
            </ul>
        </div>
    )
};

export {CatalogMenu};