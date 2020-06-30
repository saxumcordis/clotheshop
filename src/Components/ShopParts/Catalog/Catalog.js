import React, { useState, useEffect } from 'react';
import {CatalogMenu} from "./CatalogMenu";
import {Link} from "react-router-dom"

const beautePrice = price => {
    let prString = price.toString();
    let length = prString.length;
    let hd = prString.slice(length - 3);
    let th = prString.slice(0, length - 3);
    return th + " " + hd;
}

const SizeFilter = () => {
    return (
        <div className="size_box">
            Размеры:
        </div>
    )
}

const Item = ({item}) => {
    const price = item.product_price;
    const salePrice = Math.floor((100 - item.sale_percent) * price / 100);
    return (
        <div className="item">
            <title>sss</title>
            <span className="item_pics">
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
                <img className="item_pics_add" src={item.picture_2} alt={item.product_name}/>
            </span>
            <span className="item_name">{item.product_name}</span>
            {price == salePrice ? <span className="item_price">{beautePrice(price)} P</span> : <span className="item_price">{beautePrice(salePrice)} P<s>{beautePrice(price)} P</s></span>}
        </div>
    )
};

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [sizeFilter, setSizeFilter] = useState('');
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setCatalog(await catalog.json());
        })();
    }, []);
    console.log(catalog);
    return (
        <div className='global_giv'>
        <CatalogMenu/>
        <div className="catalog_box">
            <SizeFilter/>
            <div className="catalog_items">
                {catalog.map(item => <Item key={item.product_id} item={item}/>)}
            </div>
        </div>
        </div>
    )
};


export {Catalog};