import React, {useEffect, useState} from 'react';


const activePicture = {
    'border': '3px solid #252525'
};

const ItemGallery = ({item}) => {
    const [activePhoto, setActivePhoto] = useState(item.picture_1);
    let gallery = [];
    for (let i = 1; i <= 8; ++i)
        if (item['picture_' + i] != 0)
            gallery.push(item['picture_' + i]);

    return (
        <div className="item_gallery">
            <div className="item_gallery_box">
                <div className="item_gallery_feed" id="igf">
                    {gallery.map(picture => <img key={gallery.indexOf(picture)} onClick={() => setActivePhoto(picture)}
                                                 style={activePhoto === picture ? activePicture : null}
                                                 className="item_picture" src={picture}/>)}
                </div>
                <div className="scroll_box">
                    <img className='button_scroll' id="down"
                         onClick={() => document.getElementById('igf').scrollTop += 112}
                         src='https://static.tildacdn.com/tild3636-3131-4463-b465-636239623632/-png-1.png'/>
                    <img className='button_scroll' id="up"
                         onClick={() => document.getElementById('igf').scrollTop -= 112}
                         src='https://static.tildacdn.com/tild3636-3131-4463-b465-636239623632/-png-1.png'/>
                </div>
            </div>
            <img className="item_head_picture" src={activePhoto}/>
        </div>
    );
};

const ItemPreview = ({id}) => {

    const [item, setItem] = useState(null);
    const [selectedSize, setSize] = useState('');
    const [sameItems, setSameItems] = useState('');

    const handleSize = newSize => setSize(newSize);

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
        }, 1000);
    }
    console.log(sameItems);
    return (
        <div className="overlay">
            {item &&
            <div className="item_preview">
                <ItemGallery item={item}/>
                <div className="item_preview_info">
                    <div className="item_preview_info_name"><h1>{item.product_name.toUpperCase()}</h1>
                        <h3>№ {item.product_code}</h3></div>
                    <div className="item_sizes">
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
                        <img className="wish_button" src="https://image.flaticon.com/icons/svg/860/860808.svg"/>
                    </div>
                    <div className="item_preview_info_text">
                        <p>Цвет : {item.product_color_name.toLowerCase()}</p>
                        <p>Материал : {item.product_material.toLowerCase()}</p>
                        <p>Рост модели на фото . . .</p>
                    </div>
                    <div className="other_colors">
                        <p>Другие цвета:</p>
                        <div className="other_colors_gallery">
                            {(sameItems <= 0 ? <p style={{marginLeft: "5px", marginTop: 0}}>Других цветов нет в наличии</p> : sameItems.map(item => <img key={item.product_id} className="other_color_item"
                                                                     src={item.picture_3}/>))}
                        </div>
                    </div>
                    <p className="full">Подробнее о товаре</p>
                </div>
            </div>
            }
        </div>
    );
};

export {ItemPreview};