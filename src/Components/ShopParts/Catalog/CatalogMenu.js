import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

const CatalogMenu = () => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        (async () => {
            const categories = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCategories');
            setCategories(await categories.json());

        })();
    }, [setCategories]);

    return (
        <div className="catalog_menu">
            <ul className="catalog_categories">
                <li><Link to='/catalog'>КАТАЛОГ</Link></li>
                {categories && categories.map(e => <li className='catalog_category'><Link to={'/catalog/category/' + e.category_id}>{e.category_name}</Link></li>)}
                <li className='catalog_category'><Link to='/catalog/category/sale' style={{color: "red"}}>SALE</Link></li>
            </ul>
        </div>
    )
};

export {CatalogMenu};