import React, {useEffect, useState} from "react";
import {useUser} from "../../Service/Contexts/UserContext";


const AddSize = () => {
    const {isAdmin} = useUser();

    const changeFormView = () => {
        const form = document.getElementById('new_size_form');
        form.hidden = !form.hidden;
    };

    const addSize = async () => {
        if (window.confirm("Добавить новый размер?")) {
            const name = document.getElementById('new_size_name').value;
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?addSize&token=';
            const data = isAdmin.token + "&name=" + (name + "_size");
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    return (
        <div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новый размер</button>
            <div className="new_item_form" id="new_size_form" hidden={true}>
                <table>
                    <thead>
                    <tr>
                        <td>Field</td>
                        <td>Required</td>
                        <td>Value</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Название</td>
                        <td>Обязательное поле</td>
                        <td><input type="text" id="new_size_name" placeholder="Укажите название размера"/></td>
                        <button onClick={() => addSize()}>Добавить</button>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

const SizesTable = ({sizes}) => {
    const {isAdmin} = useUser();

    const submitChange = async (size_id) => {
        const newSizeName = document.getElementById(size_id + '_new_size_name').value || document.getElementById(size_id + '_new_size_name').placeholder;
        const url = 'https://miktina.herokuapp.com/backend/user/admin.php?changeSize&id=';
        const data = size_id + "&name=" + newSizeName + "_size" + "&token=" + isAdmin.token + "&oldName=" + document.getElementById(size_id + '_new_size_name').placeholder + "_size";
        const response = await fetch(url + data);
        alert(await response.text());
        window.location.reload();
    };

    const removeSize = async (size_id) => {
        if (window.confirm("Размер? [ВАЖНО] Если существует продукт с выбранным размером, это может привести к ошибке")) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?removeSize&id=';
            const data = size_id + "&token=" + isAdmin.token + "&name=" + document.getElementById(size_id + '_new_size_name').placeholder + "_size";
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    const tableView = () => {
        return (sizes &&
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>New value</td>
                    <td>Action</td>
                </tr>
                </thead>
                {sizes.map(size => <tr>
                    <td style={{width: "33%"}}>{size.name.split('_')[0]}</td>
                    <td style={{width: "33%"}}><input type="text" placeholder={size.name.split('_')[0]}
                                                      id={size.id + "_new_size_name"}/>
                    </td>
                    <td style={{width: "33%"}}>
                        <button onClick={() => submitChange(size.id)}>Сохранить</button>
                        <button onClick={() => removeSize(size.id)}>Удалить</button>
                    </td>
                </tr>)}
            </table>
        )
    };

    return (
        tableView()
    )
};

export const Sizes = () => {
    const {isAdmin} = useUser();
    const [sizes, setSizes] = useState(0);
    useEffect(() => {
        (async () => {
            const sizes = await fetch('https://miktina.herokuapp.com/backend/user/admin.php?getSizes&token=' + isAdmin.token);
            setSizes(await sizes.json());
        })();
    }, [setSizes]);

    return (
        <div className="admin_sizes_box" id="admin_sizes_box">
            <span style={{color: "red"}}>Внимательно удалять размеры.</span>
            <SizesTable sizes={sizes}/>
            <AddSize/>
        </div>
    )
};