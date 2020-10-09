import React from 'react';

export const getFields = (token) => {
    let temp = fields;
    fetch('https://miktina.herokuapp.com/backend/user/admin.php?getSizes&token=' + token).then(response => response.json())
        .then(sizes => sizes.map(e => temp.push({name: e, text: "Размер " + e.split('_')[0], required: "Если размера не существует, указать -1"})));

    return temp;
};

const fields = [
    {
        name: 'product_name',
        text: 'Название',
        required: 'Обязательное поле',
    },
    {
        name: 'category_name',
        text: 'Категория',
        required: 'Обязательное поле',
    },
    {
        name: 'product_code',
        text: 'Артикул/Код товара',
        required: 'Обязательное поле',
    },
    {
        name: 'product_color_name',
        text: 'Цвет',
        required: 'Обязательное поле',
    },
    {
        name: 'product_price',
        text: 'Стоимость',
        required: 'Обязательное поле',
    },
    {
        name: 'sale_percent',
        text: 'Скидка, %',
        required: '-',
    },
    {
        name: 'product_material',
        text: 'Материал',
        required: 'Обязательное поле',
    },
    {
        name: 'description_data',
        text: 'Описание',
        required: 'Обязательное поле',
    },
    {
        name: 'picture_1',
        text: 'Изображение 1',
        required: 'Обязательное поле',
    },
    {
        name: 'picture_2',
        text: 'Изображение 2',
        required: 'Обязательное поле',
    },
    {
        name: 'picture_3',
        text: 'Изображение 3',
        required: 'Обязательное поле',
    },
    {
        name: 'picture_4',
        text: 'Изображение 4',
        required: 'Обязательное поле',
    },
    {
        name: 'picture_5',
        text: 'Изображение 5',
        required: '-',
    },
    {
        name: 'picture_6',
        text: 'Изображение 6',
        required: '-',
    },
    {
        name: 'picture_7',
        text: 'Изображение 7',
        required: '-',
    },
    {
        name: 'picture_8',
        text: 'Изображение 8',
        required: '-',
    },
];

export {fields}