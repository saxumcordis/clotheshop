import React, {useEffect, useState} from "react";
import {useUser} from "../../Service/Contexts/UserContext";

const ColorsTable = ({colors}) => {

    const {isAdmin} = useUser();

    const submitChange = async (color_id) => {
        const newColorName = document.getElementById(color_id + '_new_color_name').value || document.getElementById(color_id + '_new_color_name').placeholder;
        const newColorCode = document.getElementById(color_id + '_new_color_code').value.slice(1);
        const url = 'https://miktina.herokuapp.com/backend/user/admin.php?changeColor&id=';
        const data = color_id + "&name=" + newColorName + "&code=" + newColorCode + "&token=" + isAdmin.token;
        const response = await fetch(url + data);
        alert(await response.text());
        window.location.reload();
    };

    const removeColor = async (color_id) => {
        if (window.confirm("Удалить цвет? [ВАЖНО] Если существует продукт с выбранным цветом, это может привести к ошибке")) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?removeColor&id=';
            const data = color_id + "&token=" + isAdmin.token;
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    const tableView = () => {
        return (colors &&
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Code</td>
                    <td>New value</td>
                    <td>Action</td>
                </tr>
                </thead>
                {colors.map(color => <tr>
                    <td style={{widht: "25%"}}>{color.color_name}</td>
                    <td style={{widht: "25%"}}><input type="color" disabled value={color.color_code}/></td>
                    <td style={{width: "25%"}}><input type="text" placeholder={color.color_name}
                                                      id={color.color_id + "_new_color_name"}/>
                        <input type="color" id={color.color_id + "_new_color_code"} defaultValue={color.color_code}/>
                    </td>
                    <td style={{widht: "25%"}}>
                        <button onClick={() => submitChange(color.color_id)}>Сохранить</button>
                        <button onClick={() => removeColor(color.color_id)}>Удалить</button>
                    </td>
                </tr>)}
            </table>
        )
    };

    return (
        tableView()
    )
};


const AddNewColor = () => {
    const {isAdmin} = useUser();

    const changeFormView = () => {
        const form = document.getElementById('new_color_form');
        form.hidden = !form.hidden;
    };

    const addColor = async () => {
        if (window.confirm("Добавить новый цвет?")) {
            const name = document.getElementById('new_color_name').value;
            const code = document.getElementById('new_color_code').value.slice(1);
            console.log(code);
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?addColor&token=';
            const data = isAdmin.token + "&name=" + name + "&code=" + code;
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    return (
        <div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новый цвет</button>
            <div className="new_item_form" id="new_color_form" hidden={true}>
                <table>
                    <thead>
                    <tr>
                        <td>Field</td>
                        <td>Required</td>
                        <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Название</td>
                        <td>Обязательное поле</td>
                        <td><input type="text" id="new_color_name" placeholder="Укажите название цвета"/></td>
                    </tr>
                    <tr>
                        <td>Код</td>
                        <td>Обязательное поле</td>
                        <td><input type="color" id="new_color_code"/></td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={() => addColor()}>Добавить</button>
            </div>
        </div>
    )
};

export const Colors = () => {

    const [colors, setColors] = useState(0);
    console.log(colors);

    useEffect(() => {
        (async () => {
            const colors = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getColors');
            setColors(await colors.json());
        })();
    }, [setColors]);

    return (
        <div className="admin_colors_box" id="admin_colors_box">
            <ColorsTable colors={colors}/>
            <AddNewColor/>
        </div>
    )
};