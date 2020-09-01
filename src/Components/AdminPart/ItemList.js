import React, {useEffect, useState} from 'react';

const Item = ({item}) => {
    return (
        <div className="item">
            <div className="item_pics">
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
            </div>
        </div>
    )
};


export const ItemList = () => {
    const [catalog, setCatalog] = useState(null);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setCatalog(await catalog.json());
        })();
    }, [setCatalog]);

    return (
        <div className="admin_items">
            {catalog && catalog.map(item => <Item item={item}/>)}
        </div>
    )
};