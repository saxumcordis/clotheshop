import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {NotFound} from "../../SystemParts/NotFound";
import {ItemGallery} from "./Gallery";
import {Loading} from "../../SystemParts/Loading";
import {Recommended} from "./Recommended";
import {useWishList} from "../../../Service/Contexts/WishListContext";
import {useCart} from "../../../Service/Contexts/CartContext";
import {handlePrice} from "../../../Service/StringHandler/StringHandler";

const MainBox = ({item}) => {
    const [content, setContent] = useState('description');
    const sizes = () => {
        let result = [];
        for (let key in item)
            if (key.match(/_size$/))
                result.push(key.split('_')[0] + ": " + item[key])
        return result.join('   ');

    }
    const details = {
        "description": item.description_data,
        "delivery": <p style={{marginTop: 0}}>Доставка по Москве и МО, от 300Р<p className="full_delivery"><Link
            to="/delivery">Подробнее о доставке и оплате</Link></p></p>,
        "quantity": sizes(),
    };
    return (
        <div className="product_details">
            <ul className="product_details_menu">
                <li className={content === 'description' ? "product_details_menu_element_active" : "product_details_menu_element"}
                    onClick={() => setContent('description')}>Описание<i/></li>
                <li className={content === 'delivery' ? "product_details_menu_element_active" : "product_details_menu_element"}
                    onClick={() => setContent('delivery')}>Доставка и оплата<i/></li>
                <li className={content === 'quantity' ? "product_details_menu_element_active" : "product_details_menu_element"}
                    onClick={() => setContent('quantity')}>Наличие<i/></li>
            </ul>
            <div className="product_detail">
                {details[content]}
            </div>
        </div>
    )
};

export const Sizes = ({item, selectedSize, setSize, setSizeWarning}) => {
    const handleSize = newSize => {
        setSize(newSize);
        setSizeWarning(!newSize)
    };
    let sizes = [];
    for (let key in item)
        if (key.match(/_size$/) && item[key] >= 0)
            sizes.push(<div
                className={item[key] <= 0 ? "button_size_unavailable" : selectedSize !== key ? "button_size" : "button_size_selected"}
                onClick={() => item[key] <= 0 ? null : handleSize(selectedSize === key ? null : key)}>{key.split('_')[0]}
            </div>);
        return sizes;
};

const Product = () => {
    const id = useParams().id;
    const [item, setItem] = useState(null);
    const [selectedSize, setSize] = useState(null);
    const [sameItems, setSameItems] = useState(null);

    const price = item && item.product_price;
    const salePrice = item && Math.floor((100 - item.sale_percent) * price / 100);
    const {add, remove, wishList} = useWishList();
    const [isWished, setWished] = useState(item && wishList.find(e => e === item.product_id));
    const [sizeWarning, setSizeWarning] = useState(null);

    const {addToCart, isLimit, showWarning, limitWarning} = useCart();
    const handleAddToCart = () => {
        const product = {
            id: item.product_id,
            size: selectedSize,
            name: item.product_name,
            photo: item.picture_2,
            price: item.product_price,
            discount: item.sale_percent,
            art: item.product_code,
            limit: item[selectedSize],
            quantity: 1
        };
        !isLimit(product) ? addToCart(product) : showWarning();
    };

    const handleWish = () => {
        isWished ? remove(item.product_id) : add(item.product_id);
        setWished(!isWished);
    };

    useEffect(() => {
        (async () => {
            const item = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getProduct&id=' + id);
            setItem(await item.json());
        })();
        setSize(null);
    }, [id]);

    useEffect(() => {
        setWished(item && wishList.find(e => e === item.product_id));
        item && !sameItems && setTimeout(async () => {
            const sameItems = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getSameProduct&id=' + id);
            setSameItems(await sameItems.json());
        }, 50);
    }, [item]);
    const isItemAvailable = () => {
        let result = [];
        for (let key in item)
            if (key.match(/_size$/))
                result.push(key);
        return result.length;
    };
    return (
        <div className='with_footer'>
            {item &&
            <div className="global_giv">
                <div className="product">
                    <ItemGallery item={item} place={"Product"}/>
                    <div className="product_preview_info">
                        <div className="product_preview_info_name"><h1>{item.product_name.toUpperCase()}</h1>
                            <h3>№ {item.product_code}</h3></div>
                        {(+price) === (+salePrice) ? <span style={{marginLeft: "20px", marginTop: "-15px"}}
                                                           className="item_price">{handlePrice(price)}</span> :
                            <span style={{marginLeft: "20px", marginTop: "-15px"}}
                                  className="item_price">{handlePrice(salePrice)}<s>{handlePrice(price)}</s></span>}
                        <div className="product_sizes" style={{marginTop: "10px"}}>
                            <Sizes item={item} selectedSize={selectedSize} setSize={setSize} setSizeWarning={setSizeWarning}/>
                        </div>
                        <div className="cart_wish_box">
                            <button className={"cart_button"}
                                    onClick={() => selectedSize ? handleAddToCart() : setSizeWarning(1)}>{!(isItemAvailable()) ? "НЕТ В НАЛИЧИИ" : "В КОРЗИНУ"}
                            </button>
                            {isWished ? <img className="wish_button" onClick={handleWish}
                                             src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1597147009/heart_active_kc8lxo.png"
                                             alt="Удалить из списка желаемого"/>
                                : <img className="wish_button" onClick={handleWish}
                                       src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594648024/heart_fha8br.png"
                                       alt="Добавить в список желаемого"/>
                            }
                        </div>
                        {sizeWarning &&
                        <span className="size_cart_warning">Выберите желаемый размер</span>}
                        {limitWarning &&
                        <span className="size_cart_warning">Для оформления заказа недостаточно товара.</span>}
                        <div className="product_preview_info_text">
                            <p>Цвет : {item.color_name.toLowerCase()}</p>
                            <p>Материал : {item.product_material.toLowerCase()}</p>
                            <p>Рост модели на фото . . .</p>
                        </div>
                        <MainBox item={item}/>
                        <div className="other_colors">
                            <p>Другие цвета:</p>
                            <div className="other_colors_gallery">
                                {(sameItems <= 0 ? <p style={{marginLeft: "5px", marginTop: 0}}>Других цветов нет в
                                    наличии</p> : sameItems.map(item => <Link key={item.product_id + "2"}
                                                                              to={(() => "/catalog/item/" + item.product_id)}><img
                                    className="other_color_item"
                                    src={item.picture_3}/></Link>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {!item ? item === 0 ? <NotFound/> : <Loading/> :
                <Recommended filterId={item.product_id}/>}
        </div>
    )
};

export {Product};