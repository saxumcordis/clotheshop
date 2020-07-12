import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {NotFound} from "../../SystemParts/NotFound";
import {ItemGallery} from "./Gallery";
import {Loading} from "../../SystemParts/Loading";

const beautyPrice = price => {
    let prString = price.toString();
    let length = prString.length;
    let hd = prString.slice(length - 3);
    let th = prString.slice(0, length - 3);
    return th + " " + hd;
};

const activeMainBox = {
    "borderBottom": "2px solid black"
}

const MainBox = ({item}) => {
    const [content, setContent] = useState('description');
    const details = {
        "description": item.description_data,
        "delivery": <p style={{marginTop: 0}}>Доставка по Москве и МО, от 300Р<p className="full_delivery"><Link to="/delivery">Подробнее о доставке и оплате</Link></p></p>,
        "quantity": "42-44: " + item.small_size + " 46-48: " + item.medium_size,
    };
  return (
      <div className="product_details">
          <ul className="product_details_menu">
              <li className={content === 'description' ? "product_details_menu_element_active" : "product_details_menu_element"} onClick={() => setContent('description')}>Описание<i/></li>
              <li className={content === 'delivery' ? "product_details_menu_element_active" : "product_details_menu_element"} onClick={() => setContent('delivery')}>Доставка и оплата<i/></li>
              <li className={content === 'quantity' ? "product_details_menu_element_active" : "product_details_menu_element"} onClick={() => setContent('quantity')}>Наличие<i/></li>
          </ul>
          <div className="product_detail">
              {details[content]}
          </div>
      </div>
  )
};

const Product = ({setPath}) => {
    const id = useParams().id;
    setPath('/catalog');
    const [item, setItem] = useState(null);
    const [selectedSize, setSize] = useState('');
    const [sameItems, setSameItems] = useState(null);
    const handleSize = newSize => setSize(newSize);

    const price = item && item.product_price;
    const salePrice = item && Math.floor((100 - item.sale_percent) * price / 100);
    console.log((+price) === (+salePrice));

    useEffect(() => {
        (async () => {
            const item = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getProduct&id=' + id);
            setItem(await item.json());
        })();
    }, []);
    if (item && !sameItems) {
        setTimeout(async () => {
            const sameItems = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php/?getSameProduct&id=' + id + '&code=' + item.product_code);
            setSameItems(await sameItems.json());
        }, 50);
    }
    return (
        <div className='with_footer'>
            {item &&
            <div className="global_div">
                <div className="product">
                    <ItemGallery item={item} place={"Product"}/>
                    <div className="product_preview_info" style={{marginLeft: "40px"}}>
                        <div className="product_preview_info_name"><h1>{item.product_name.toUpperCase()}</h1>
                            <h3>№ {item.product_code}</h3></div>
                        {(+price) === (+salePrice)  ? <span style={{marginLeft: "20px", marginTop: "-15px"}}  className="item_price">{beautyPrice(price)} P</span> :
                            <span style={{marginLeft: "20px", marginTop: "-15px"}}  className="item_price">{beautyPrice(salePrice)} P<s>{beautyPrice(price)} P</s></span>}
                        <div className="product_sizes" style={{marginTop: "10px"}}>
                            <div
                                className={item.small_size <= 0 ? "button_size_unavailable" : selectedSize !== '42-44' ? "button_size" : "button_size_selected"}
                                onClick={() => item.small_size <= 0 ? null : handleSize(selectedSize === '42-44' ? '' : '42-44')}>42-44
                            </div>
                            <div
                                className={item.medium_size <= 0 ? "button_size_unavailable" : selectedSize !== '46-48' ? "button_size" : "button_size_selected"}
                                onClick={() => item.medium_size <= 0 ? null : handleSize(selectedSize === '46-48' ? '' : '46-48')}>46-48
                            </div>
                        </div>
                        <div className="cart_wish_box">
                            <button className="cart_button">В КОРЗИНУ</button>
                            <img className="wish_button" src="к"/>
                        </div>
                        <div className="product_preview_info_text">
                            <p>Цвет : {item.product_color_name.toLowerCase()}</p>
                            <p>Материал : {item.product_material.toLowerCase()}</p>
                            <p>Рост модели на фото . . .</p>
                        </div>
                        <MainBox item={item}/>
                        <div className="other_colors">
                            <p>Другие цвета:</p>
                            <div className="other_colors_gallery">
                                {(sameItems <= 0 ? <p style={{marginLeft: "5px", marginTop: 0}}>Других цветов нет в
                                    наличии</p> : sameItems.map(item => <Link to={(() => "/catalog/item/" + item.product_id)}><img key={item.product_id}
                                                                                                                                  className="other_color_item"
                                                                                                                                  src={item.picture_3}/></Link>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {!item ? item === 0 ? <NotFound/> : <Loading/> :
            <div className="recommended">
                AAAAAAAAA
            </div>}
        </div>
    )
};

export {Product};