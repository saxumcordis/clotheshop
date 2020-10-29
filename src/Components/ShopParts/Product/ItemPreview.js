import React, {useEffect, useState} from 'react';
import {ItemGallery} from "./Gallery";
import {Link} from "react-router-dom";
import {useWishList} from "../../../Service/Contexts/WishListContext";
import {useCart} from "../../../Service/Contexts/CartContext";
//import {useMedia} from "use-media";
import {Sizes} from "./Product";


const ItemPreview = ({id, setItemPreview}) => {
    const [item, setItem] = useState(null);
    const [itemId, setId] = useState(id);
    const [selectedSize, setSize] = useState(null);
    const [sameItems, setSameItems] = useState('');
    const {add, remove, wishList} = useWishList();
    const [isWished, setWished] = useState(item && wishList.find(e => e === item.product_id));
    const [sizeWarning, setSizeWarning] = useState(null);
    const handleWish = () => {
        isWished ? remove(item.product_id) : add(item.product_id);
        setWished(!isWished);
    };

    const {addToCart, isLimit, showWarning, limitWarning} = useCart();

    const handleAddToCart = () => {
        const product = {id: item.product_id,
            size: selectedSize,
            name: item.product_name,
            photo: item.picture_2,
            price: item.product_price,
            discount: item.sale_percent,
            art: item.product_code,
            limit: item[selectedSize],
            quantity: 1};
        !isLimit(product) ? addToCart(product) : showWarning();
    };

    const handleClick = event => {
        if (event.target === document.getElementsByClassName('overlay')[0])
            setItemPreview(false);
    };

    //const isDesktop = useMedia('screen and (min-width: 960px)');

    useEffect(() => {
        (async () => {
            const item = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getProduct&id=' + (itemId));
            setItem(await item.json());
            setSize(null);
        })();
    }, [itemId]);
    useEffect(() => {
        setWished(item && wishList.find(e => e === item.product_id));
    }, [item]);
    useEffect(() => {
        (async () => {
        const sameItems = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getSameProduct&id=' + itemId);
        setSameItems(await sameItems.json());
    })()}, [itemId]);
    const isItemAvailable = () => {
        let result = [];
        for (let key in item)
            if (key.match(/_size$/))
                result.push(key);
        return result.length;
    };
    return (
        <div className="overlay" onClick={handleClick}>
            {item &&
            <div className="item_preview">
                {!1 && <div className="item_preview_info_name"><h1>{item.product_name.toUpperCase()}</h1></div>}
                <ItemGallery item={item}/>
                <div className="item_preview_info">
                    {1 && <div className="item_preview_info_name"><h1>{item.product_name.toUpperCase()}</h1>
                        <h3>№ {item.product_code}</h3></div>}
                    <div className="item_sizes">
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
                    {sizeWarning && <span className="size_cart_warning">Выберите желаемый размер</span>}
                    {limitWarning && <span className="size_cart_warning">Для оформления заказа недостаточно товара.</span>}
                    <div className="item_preview_info_text">
                        <p>Цвет : {item.color_name.toLowerCase()}</p>
                        <p>Материал : {item.product_material.toLowerCase()}</p>
                        <p>Рост модели на фото . . .</p>
                    </div>
                    <div className="other_colors">
                        <p>Другие цвета:</p>
                        <div className="other_colors_gallery">
                            {(sameItems <= 0 ? <p style={{marginLeft: "5px", marginTop: 0}}>Других цветов нет в
                                наличии</p> : sameItems.map(item => <Link
                                to={(() => "/catalog/")}><img key={item.product_id} onClick={() => setId(item.product_id)}
                                                                                     className="other_color_item"
                                                                                     src={item.picture_3}/></Link>))}
                        </div>
                    </div>
                    <p className="full"><Link to={(() => "/catalog/item/" + item.product_id)}>Подробнее о товаре</Link>
                    </p>
                </div>
                <div className="close_fancy">
                    <span onClick={() => setItemPreview(false)}> × </span>
                </div>
            </div>
            }
        </div>
    );
};

export {ItemPreview};