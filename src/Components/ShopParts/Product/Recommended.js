import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";

const beautyPrice = price => {
    let prString = price.toString();
    let length = prString.length;
    let hd = prString.slice(length - 3);
    let th = prString.slice(0, length - 3);
    return th + " " + hd;
};

const Item = ({item}) => {
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
            <span className="item_pics" onClick={handleItemClick}>
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
                <img className="item_pics_add" src={item.picture_2} id={(() => "item_" + item.product_id)()}
                     alt={item.product_name}/>
            </span>
            <span className="item_name">{item.product_name}</span>
            {(+price) === (+salePrice) ? <span className="item_price">{beautyPrice(price)} P</span> :
                <span className="item_price">{beautyPrice(salePrice)} P<s>{beautyPrice(price)} P</s></span>}
        </div>
    )
};


const Recommended = ({filterId}) => {
    const [items, setItems] = useState(null);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getRecommended');
            setItems(await catalog.json());
        })();
    }, []);

    const showItems = items && items.filter(item => item.product_id !== filterId).map(item => <Item
        key={item.product_id} item={item}/>);
    if (showItems && showItems.length > 0)
        return (
            <div className="recommended_box">
                <p>Рекомендуемые товары</p>
                <div className="recommended">
                    {showItems}
                </div>
            </div>
        );
    else
        return null;
};


export {Recommended};