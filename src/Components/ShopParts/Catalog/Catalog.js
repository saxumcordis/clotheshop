import React, {useState, useEffect} from 'react';
import {CatalogMenu} from "./CatalogMenu";
import {ItemPreview} from "../Product/ItemPreview";
import {Filter} from "./Filter";
import {Redirect} from "react-router-dom";
import {Loading} from "../../SystemParts/Loading";

const beautyPrice = price => {
    let prString = price.toString();
    let length = prString.length;
    let hd = prString.slice(length - 3);
    let th = prString.slice(0, length - 3);
    return th + " " + hd;
};

const Item = ({item}) => {
    const [itemPreview, setItemPreview] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const price = item.product_price;
    const salePrice = Math.floor((100 - item.sale_percent) * price / 100);

    const handleItemClick = event => {
        if (event.target.className === "item_pics_add")
            setRedirect('/catalog/item/' + item.product_id);
    };

    if (redirect)
        return (<Redirect push to={redirect}/>);
    return (
                <div className="item">
                    {itemPreview && <ItemPreview id={item.product_id} setItemPreview={setItemPreview}/>}
                    <span className="item_pics" onClick={handleItemClick}>
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
                <img className="item_pics_add" src={item.picture_2} id={(() => "item_" + item.product_id)()}
                     alt={item.product_name}/>
                <div className="into_preview" onClick={() => setItemPreview(true)}>БЫСТРЫЙ ПРОСМОТР</div>
            </span>
                    <span className="item_name">{item.product_name}</span>
                    {(+price) === (+salePrice) ? <span className="item_price">{beautyPrice(price)} P</span> :
                        <span className="item_price">{beautyPrice(salePrice)} P<s>{beautyPrice(price)} P</s></span>}
                </div>
    )
};

const Catalog = ({setPath}) => {
    setPath('/catalog');
    const [catalog, setCatalog] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(false);
    const [activeColors, setActiveColor] = useState(false);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setCatalog(await catalog.json());
        })();
    }, []);
    const showCatalog = catalog && catalog.filter(item => !sizeFilter ? 1
        : sizeFilter.includes('small') ? item.small_size > 0
            : sizeFilter.includes('medium') ? item.medium_size > 0
                : 1)
        .filter(item => !activeColors ? 1
            : item.color_code === activeColors || activeColors.includes(item.color_code))
        .map(item => <Item key={item.product_id} item={item}/>);
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <CatalogMenu/>
                {catalog &&
                <div className="catalog_box">
                    <Filter sizeFilter={sizeFilter} setSizeFilter={setSizeFilter}
                            colors={catalog.map(e => [e.product_color_name, e.color_code])} activeColors={activeColors}
                            setActiveColor={setActiveColor}/>
                    <div className="catalog_items">
                        {showCatalog.length > 0 ? showCatalog : <h1>Нет подходящих вещей</h1>}
                    </div>
                </div>
                }
                {!catalog ? <Loading/> : null}
            </div>
        </div>
    )
};


export {Catalog, Item};