import React, { useState, useEffect } from 'react';
import {CatalogMenu} from "./CatalogMenu";
import {ItemPreview} from "./ItemPreview";
import {Filter} from "./Filter";

const beautePrice = price => {
    let prString = price.toString();
    let length = prString.length;
    let hd = prString.slice(length - 3);
    let th = prString.slice(0, length - 3);
    return th + " " + hd;
};


const Item = ({item}) => {
    const [itemPreview, setItemPreview] = useState(false);
    const price = item.product_price;
    const salePrice = Math.floor((100 - item.sale_percent) * price / 100);
    return (
        <div className="item" onClick={() => setItemPreview(true)}>
            {itemPreview && <ItemPreview id={item.product_id}/>}
            <span className="item_pics">
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
                <img className="item_pics_add" src={item.picture_2} alt={item.product_name}/>
            </span>
            <span className="item_name">{item.product_name}</span>
            {price === salePrice ? <span className="item_price">{beautePrice(price)} P</span> : <span className="item_price">{beautePrice(salePrice)} P<s>{beautePrice(price)} P</s></span>}
        </div>
    )
};

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [sizeFilter, setSizeFilter] = useState(false);
    const [activeColors, setActiveColor] = useState(false);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setCatalog(await catalog.json());
        })();
    }, []);
    const showCatalog = catalog.filter(item => !sizeFilter ? 1
        : sizeFilter.includes('small') ? item.small_size > 0
            : sizeFilter.includes('medium') ? item.medium_size > 0
                : 1)
        .filter(item => !activeColors ? 1
            : item.color_code === activeColors || activeColors.includes(item.color_code))
        .map(item => <Item key={item.product_id} item={item}/>)
    return (
        <div className='global_giv'>
        <CatalogMenu/>
        <div className="catalog_box">
            <Filter sizeFilter={sizeFilter} setSizeFilter={setSizeFilter} colors={catalog.map(e => [e.product_color_name, e.color_code])} activeColors={activeColors} setActiveColor={setActiveColor}/>
            <div className="catalog_items">
                {showCatalog.length > 0 ? showCatalog : <h1>Нет подходящих вещей</h1>}
            </div>
        </div>
        </div>
    )
};


export {Catalog};