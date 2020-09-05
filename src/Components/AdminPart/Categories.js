import React, {useEffect, useState} from 'react';
import {useUser} from "../../Service/Contexts/UserContext";


const CategoriesTable = ({categories}) => {

    const {isAdmin} = useUser();

    const submitChange = async (category_id) => {
        const newName = document.getElementById(category_id + "_new_category_name").value;
        const url = 'https://miktina.herokuapp.com/backend/user/admin.php?changeCategory&id=';
        const data = category_id + "&name=" + newName + "&token=" + isAdmin.token;
        const response = await  fetch(url + data);
        alert(await response.text());
        window.location.reload();
    };

    const removeCategory = async (category_id) => {
        if (window.confirm("Удалить категорию? [ВАЖНО] Если существует продукт с выбранной категорией, это может привести к ошибке")) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?removeCategory&id=';
            const data = category_id + "&token=" + isAdmin.token;
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    const tableView = () => {
        return (categories &&
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>New Value</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {categories.map(category =>
                    <tr>
                        <td>{category.category_name}</td>
                        <td><input type="text" id={category.category_id + "_new_category_name"} placeholder="Новое название"/></td>
                        <td><button onClick={() => submitChange(category.category_id)}>Сохранить</button>
                            <button onClick={() => removeCategory(category.category_id)}>Удалить</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    };

    return (
        tableView()
    )
};

const AddNewCategory = () => {
    const {isAdmin} = useUser();

    const changeFormView = () => {
        const form = document.getElementById('new_category_form');
        form.hidden = !form.hidden;
    };

    const addCategory = async () => {
        if (window.confirm("Добавить новую категорию?")) {
            const name = document.getElementById('new_category_name').value;
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?addCategory&token=';
            const data = isAdmin.token + "&name=" + name;
            const response = await fetch(url + data);
            alert(await response.text());
            window.location.reload();
        }
    };

    return (
        <div className="admin_new_item">
            <button onClick={() => changeFormView()}>Добавить новую категорию</button>
            <div className="new_item_form" id="new_category_form" hidden={true}>
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
                        <td><input type="text" id="new_category_name" placeholder="Укажите название категории"/></td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={() => addCategory()}>Добавить</button>
            </div>
        </div>
    )
};

export const Categories = () => {

    const [categories, setCategories] = useState(0);
    useEffect(() => {
        (async () => {
            const categories = await fetch('https://miktina.herokuapp.com/backend/catalog/products.php?getCategories');
            setCategories(await categories.json());
        })();
    }, [setCategories]);

    return (
        <div className="admin_categories_box" id="admin_categories_box">
            <CategoriesTable categories={categories}/>
            <AddNewCategory/>
        </div>
    )
};

