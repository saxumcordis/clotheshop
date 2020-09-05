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
        alert (await response.text());
        window.location.reload();
    };

    const removeColor = (color_id) => {

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
    const changeFormView = () => {
        const form = document.getElementById('new_color_form');
        form.hidden = !form.hidden;
    };

    return (
        <div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новый цвет</button>
            <div className="new_item_form" id="new_color_form" hidden={true}>
                aa
            </div>
        </div>
    )
};

export const Colors = () => {

    const [colors, setColors] = useState(0);

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