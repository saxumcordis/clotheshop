import {useUser} from "../../Service/Contexts/UserContext";
import React from "react";

export const ItemEdition = ({item, categories, colors}) => {

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
            field = "product_color_id";
            const temp = document.getElementById('new_color_select');
            value = temp.options[temp.selectedIndex].id.split('').filter(e => Number(e)).join('');
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
                {colors.map(e => <option id={"color_" + e.color_id + "_input"}>{e.color_name}</option>)}
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
                <span style={{color: "red"}}>Если у продукта не существует размера, указать -1</span>
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