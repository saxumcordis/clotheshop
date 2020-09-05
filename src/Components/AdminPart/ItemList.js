import React, {useEffect, useState} from 'react';
import {ItemEdition} from "./ItemEdition";
import {AddNewItem} from "./AddNewItem";

const Item = ({item, onClick}) => {
    return (
        <div className="item" onClick={onClick}>
            <div className="item_pics">
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
            </div>
        </div>
    )
};


export const ItemList = () => {
    const [catalog, setCatalog] = useState(null);
    const [categories, setCategories] = useState(null);
    const [colors, setColors] = useState(null);
    const [item, setItem] = useState(0);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getAdminProducts');
            setCatalog(await catalog.json());
            const categories = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCategories');
            setCategories(await categories.json());
            const colors = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getColors');
            setColors(await colors.json());
        })();
    }, [setCatalog]);

    return (
        <div className="admin_items_box" id="admin_items_box">
            <div className="admin_items">
                {catalog && catalog.map(item => <Item onClick={() => setItem(item)} key={item.product_id}
                                                      item={item}/>)}
            </div>
            <AddNewItem categories={categories} colors={colors}/>
            <ItemEdition item={item} categories={categories} colors={colors}/>
        </div>
    )
};