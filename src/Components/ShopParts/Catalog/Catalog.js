import React, {useState, useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {CatalogMenu} from "./CatalogMenu";
import {ItemPreview} from "../Product/ItemPreview";
import {Filter} from "./Filter";
import {Redirect, useLocation} from "react-router-dom";
import {Loading} from "../../SystemParts/Loading";
import {useWishList} from "../../../Service/Contexts/WishListContext";
import {useMedia} from "use-media";
import {handlePrice} from "../../../Service/StringHandler/StringHandler";

const getPriceDiff = (a, b) => {
    const first = Math.floor((100 - a.sale_percent) * a.product_price / 100);
    const second = Math.floor((100 - b.sale_percent) * b.product_price / 100);
    return first - second;
};

const Item = ({item}) => {
    const location = useLocation();
    const [itemPreview, setItemPreview] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const price = item.product_price;
    const salePrice = Math.floor((100 - item.sale_percent) * price / 100);

    const isWide = useMedia('screen and (min-width: 600px)');

    const {add, remove, wishList} = useWishList();
    const isWished = useMemo(() => wishList.some(e => e === item.product_id), [wishList]);
    const handleItemClick = event => {
        if (event.target.className === "item_pics_add")
            setRedirect('/catalog/item/' + item.product_id);
    };
    const handleWish = () => {
        let result = location.pathname === "/wish" && window.confirm("Вы действительно хотите удалить товар из списка желаемого?");
        if (location.pathname === "/wish" && result)
            remove(item.product_id);
        else
            isWished && location.pathname !== "/wish" ? remove(item.product_id) : add(item.product_id);

    };
    if (redirect)
        return (<Redirect push to={redirect}/>);
    return (
        <div className="item">
            {itemPreview && <ItemPreview id={item.product_id} setItemPreview={setItemPreview}/>}
            <span className="item_pics" onClick={handleItemClick}>
                {isWished ?
                    <img className="wish_catalog wished" onClick={handleWish}
                         src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1597147009/heart_active_kc8lxo.png"
                         alt="Удалить из списка желаний"/>
                    : <img className="wish_catalog" onClick={handleWish}
                           src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594650783/heart2_l7vzsg.png"
                           alt="Добавить в список желаний"/>}
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
                <img className="item_pics_add" src={item.picture_2} id={(() => "item_" + item.product_id)()}
                     alt={item.product_name}/>
                {isWide && <div className="into_preview" onClick={() => setItemPreview(true)}>БЫСТРЫЙ ПРОСМОТР</div>}
            </span>
            <span className="item_name">{item.product_name}</span>
            {(+price) === (+salePrice) ? <span className="item_price">{handlePrice(price)}</span> :
                <span className="item_price">{handlePrice(salePrice)}<s>{handlePrice(price)}</s></span>}
        </div>
    )
};

const Catalog = () => {
    const categoryId = useParams().id;
    const [catalog, setCatalog] = useState(null);
    const [activeSizes, setActiveSizes] = useState([]);
    const [activeColors, setActiveColor] = useState([]);
    const [sort, setSort] = useState({name: 'По цене (по возрастанию)', type: 'price', dir: 'asc'});
    console.log(catalog);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCatalog');
            setCatalog(await catalog.json());
        })();
    }, [setCatalog]);
    const showCatalog = catalog && catalog.filter(item => item.category_id === categoryId || categoryId === 'sale' && +item.sale_percent > 0 || !categoryId && 1)
        .filter(item => !activeColors.length ? 1
            : item.color_code === activeColors || activeColors.includes(item.color_code))
        .sort((a, b) => sort.dir === 'asc' ? getPriceDiff(a, b) : getPriceDiff(b, a))
        .map(item => <Item key={item.product_id} item={item}/>);
    const getSizes = item => {
        let result = [];
        for (let key in item)
            if (key.match(/_size$/))
                result.push(key.split('_')[0]);
        return result;
    };
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <CatalogMenu/>
                {catalog &&
                <div className="catalog_box">
                    <Filter sizes={getSizes(catalog[0])}
                            activeSizes={activeSizes} setActiveSizes={setActiveSizes}
                            colors={catalog.filter(item => item.category_id === categoryId || categoryId === 'sale' && +item.sale_percent > 0 || !categoryId && 1).map(e => [e.color_name, e.color_code])}
                            activeColors={activeColors}
                            setActiveColor={setActiveColor} sort={sort} setSort={setSort}/>
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