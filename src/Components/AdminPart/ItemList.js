import React, {useEffect, useState} from 'react';
import {useUser} from "../../Service/Contexts/UserContext";

const Item = ({item, onClick}) => {
    return (
        <div className="item" onClick={onClick}>
            <div className="item_pics">
                <img className="item_pics_main" src={item.picture_1} alt={item.product_name}/>
            </div>
        </div>
    )
};

const ItemEdition = ({item, categories, colors}) => {

    const {isAdmin} = useUser();

    const removeItem = async () => {
        if (window.confirm("Желаете удалить продукт?")) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?removeProduct&productId=';
            const data = item.product_id + "&token=" + isAdmin.token;
            const response = await fetch(url + data);
            alert (await response.text());
            window.location.reload();
        }
    };

    const submitChange = async (field) => {
        let value = "";
        if (field === "category_name") {
            field = "product_category_id";
            const temp = document.getElementById('new_category_select');
            value = temp.options[temp.selectedIndex].id.split('').filter(e => Number(e)).join('');
        }
        else if (field === "product_color_name") {
            const temp = document.getElementById('new_color_select');
            value = temp.options[temp.selectedIndex].value;
        }
        else
            value = document.getElementById(field + "_input").value;
        const url = 'https://miktina.herokuapp.com/backend/user/admin.php?updateProduct&productId=';
        const data = item.product_id + "&field=" + field + "&value=" + value + "&token=" + isAdmin.token;
        const response = await fetch(url + data);
        alert(await response.text());
        window.location.reload();
    };

    const handleField = (item, field) => {
        let tableRow = [];
        tableRow.push(<td>{field}</td>);
        if (/^picture/.test(field)) {
            tableRow.push(<td><img className="admin_table_image" src={item[field]}/></td>);
            tableRow.push(<td><input type="text" placeholder="URL" id={field + "_input"}/></td>);
            tableRow.push(<td>
                <button onClick={() => submitChange(field)}>Сохранить</button>
            </td>);
        } else if (/^product_id/.test(field)) {
            tableRow.push(<td>{item[field]}</td>);
            tableRow.push(<td>-</td>);
            tableRow.push(<td>-</td>);
        } else if (/^product_color_name/.test(field)) {
            tableRow.push(<td>{item[field]}</td>);
            tableRow.push(<td><select id="new_color_select">
                {colors.map((e, i) => <option id={"color_" + i + "_input"}>{e.color_name}</option>)}
            </select></td>);
            tableRow.push(<td>
                <button onClick={() => submitChange(field)}>Сохранить</button>
            </td>);
        } else if (/^category_name/.test(field)) {
            tableRow.push(<td>{item[field]}</td>);
            tableRow.push(<td><select id="new_category_select">
                {categories.map(e => <option id={"category_" + e.category_id + "_input"}>{e.category_name}</option>)}
            </select></td>);
            tableRow.push(<td>
                <button onClick={() => submitChange(field)}>Сохранить</button>
            </td>);
        } else if (/^color_code/.test(field)) {
            tableRow.push(<td><input type="color" value={item[field]} disabled/></td>);
            tableRow.push(<td>-</td>);
            tableRow.push(<td>-</td>);
        } else {
            tableRow.push(<td>{item[field]}</td>);
            tableRow.push(<td><input type="text" id={field + "_input"} placeholder="Новое значение"/></td>);
            tableRow.push(<td>
                <button onClick={() => submitChange(field)}>Сохранить</button>
            </td>);
        }

        return tableRow;
    };

    const itemToTable = () => {
        let result = [];
        for (let field in item) {
            result.push(<tr>{handleField(item, field)}
            </tr>)
        }
        return result;
    };

    if (item)
        return (
            <div className="admin_item_table_box">
                <h1> Редактировать товар </h1>
                <table>
                    <thead>
                    <tr>
                        <td>Field</td>
                        <td>Value</td>
                        <td>New Value</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {itemToTable()}
                    </tbody>
                </table>
                <button onClick={() => removeItem()}>Удалить товар </button>
            </div>
        );
    else
        return <></>

};


export const ItemList = () => {
    const [catalog, setCatalog] = useState(null);
    const [categories, setCategories] = useState(null);
    const [colors, setColors] = useState(null);
    const [item, setItem] = useState(0);
    useEffect(() => {
        (async () => {
            const catalog = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getAdminProducts');
            setCatalog(await catalog.json());
            const categories = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCategories');
            setCategories(await categories.json());
            const colors = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getColors');
            setColors(await colors.json());
        })();
    }, [setCatalog]);

    return (
        <div className="admin_items_box">
            <div className="admin_items">
                {catalog && catalog.map(item => <Item onClick={() => setItem(item)} key={item.product_id}
                                                      item={item}/>)}
            </div>
            <ItemEdition item={item} categories={categories} colors={colors}/>
        </div>
    )
};