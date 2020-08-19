import React, {useEffect, useState} from 'react'
import {useWishList} from "../../Service/Contexts/WishListContext";
import {Item} from "../ShopParts/Catalog/Catalog";
import {usePath} from "../../Service/Contexts/PathContext";

const Wish = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/wish'));
    const {wishList} = useWishList();
    const [wishCatalog, setWishCatalog] = useState(null);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setWishCatalog(await catalog.json());
        })();
    }, []);

    const showWishCatalog = wishCatalog && wishCatalog.filter(item => wishList.find(e => e === item.product_id)).map(item =>
        <Item key={item.product_id} item={item}/>);
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className='wish_div'>
                    <div className='wish_box'>
                        <h1>Список желаний</h1>
                    </div>
                    <div className="catalog_items" style={{marginLeft: "100px"}}>
                        {showWishCatalog && showWishCatalog.length > 0 ? showWishCatalog : <p className="empty_list">Список желаний пуст</p>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export {Wish}