import React from 'react';
import {fields} from './ProductFields';

export const AddNewItem = ({categories, colors}) => {

    const changeFormView = () => {
        const form = document.getElementById('new_item_form');
        form.hidden = !form.hidden;
    };

    const handleField = (field) => {
        let tableRow = [];
        tableRow.push(<td>{field.text}</td>);
        if (/^picture/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><input type="text" placeholder="URL" id={"new_" + field.text + "_input"}/></td>);
        } else if (/^product_color_name/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><select id="new_item_color">
                {colors.map(e => <option id={"new_color_" + e.color_id + "_input"}>{e.color_name}</option>)}
            </select></td>);
        } else if (/^category_name/.test(field.name)) {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><select id="new_category_select">
                {categories.map(e => <option
                    id={"new_category_" + e.category_id + "_input"}>{e.category_name}</option>)}
            </select></td>);
        } else {
            tableRow.push(<td>{field.required}</td>);
            tableRow.push(<td><input type="text" id={"new_" + field.name + "_input"} placeholder="Новое значение"/></td>);
        }

        return tableRow;
    };

    const fieldsToTable = () => {
        console.log(fields);
        return fields.map(field => <tr>{handleField(field)}
        </tr>);
    };
    if (categories && colors)
        return (<div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новый продукт</button>
            <div className="new_item_form" id="new_item_form" hidden={true}>
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
            </div>
        </div>);
    return <></>
};