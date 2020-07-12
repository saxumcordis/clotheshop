import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {NotFound} from "../../SystemParts/NotFound";
import {ItemGallery} from "./Gallery";
import {Loading} from "../../SystemParts/Loading";

const Product = ({setPath}) => {
    const id = useParams().id;
    setPath('/catalog');
    const [item, setItem] = useState(null);
    const [sameItems, setSameItems] = useState(null);

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
                { item !== 0 ?
                <div className="product">
                    <ItemGallery item={item}/>
                    <div className="product_info">
                    </div>
                </div>
                    : item === 0 ? <NotFound/> : null
                }
            </div>
            }
            {!item ? <Loading/> : null}
        </div>
    )
};

export {Product};