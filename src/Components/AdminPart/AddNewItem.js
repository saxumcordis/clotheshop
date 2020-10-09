import React, {useEffect, useState} from 'react';
import {useUser} from "../../Service/Contexts/UserContext";
import {getFields} from "./ProductFields";


const renameFields = (fields) => {
    return fields.map(field => field.name === 'product_color_name' ? {
        ...field,
        name: 'product_color_id'
    } : field.name === 'category_name' ? {...field, name: 'category_id'} : field);
};

const initFields = (fields) => {
    return renameFields(fields).map(field => {
        if (/^product_color_id/.test(field.name)) {
            const temp = document.getElementById('new_item_color');
            field.value = temp.options[temp.selectedIndex].id.split('').filter(e => Number(e)).join('');
        } else if (/^category_id/.test(field.name)) {
            const temp = document.getElementById('new_item_category');
            field.value = temp.options[temp.selectedIndex].id.split('').filter(e => Number(e)).join('');
        } else
            field.value = document.getElementById("new_" + field.name + "_input").value;
        return field;
    });
};

export const AddNewItem = ({categories, colors}) => {

    const {isAdmin} = useUser();
    const [fields, setFields] = useState(0);

    useEffect(() => {
        (async () => {
            setFields(getFields(isAdmin.token))
        })();
    }, [setFields]);

    const changeFormView = () => {
        const form = document.getElementById('new_item_form');
        form.hidden = !form.hidden;
    };

    const addItem = async () => {
        if (window.confirm("Добавить продукт?")) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?addProduct&token=';
            const token = isAdmin.token;
            const data = initFields(fields).map(field => "&" + field.name + "=" + field.value).join('');
            const response = await fetch(url + token + data);
            alert(await response.text());
            window.location.reload();
        }
    };


    const handleField = (field) => {
        let tableRow = [];
        tableRow.push(<td>{field.text}</td>);
        if (/^picture/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><input type="text" placeholder="URL" id={"new_" + field.name + "_input"}/></td>);
        } else if (/^product_color_name/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><select id="new_item_color">
                {colors.map(e => <option id={"new_color_" + e.color_id + "_input"}>{e.color_name}</option>)}
            </select></td>);
        } else if (/^category_name/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><select id="new_item_category">
                {categories.map(e => <option
                    id={"new_category_" + e.category_id + "_input"}>{e.category_name}</option>)}
            </select></td>);
        } else {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><input type="text" id={"new_" + field.name + "_input"} placeholder="Новое значение"/>
            </td>);
        }

        return tableRow;
    };

    const fieldsToTable = () => {
        return fields.map(field => <tr>{handleField(field)}
        </tr>);
    };
    if (categories && colors)
        return (<div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новый продукт</button>
            <div className="new_item_form" id="new_item_form" hidden={true}>
                <span style={{color: "red"}}>Если у продукта не существует размера, указать -1</span>
                <table>
                    <thead>
                    <tr>
                        <td>Field</td>
                        <td>Required</td>
                        <td>New Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    {fieldsToTable()}
                    </tbody>
                </table>
                <button onClick={() => addItem()}>Добавить</button>
            </div>
        </div>);
    return <></>
};