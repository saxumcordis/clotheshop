import React from 'react'


export const Navigation = () => {

    const items = ['admin_items_box', 'admin_categories_box', 'admin_colors_box', 'admin_delivery_box', 'admin_orders_box', 'admin_sizes_box'];

    const handleView = (item_id) => {
        const elem = document.getElementById(item_id);
        const currentStatus = elem.style.display;
        elem.style.display = currentStatus === 'none' || currentStatus === "" ? 'flex' : 'none';
        if (currentStatus !== 'flex')
            items.filter(e => e !== item_id).forEach(e => {
                document.getElementById(e).style.display = 'none';
            })
    };

    return (
        <nav className="admin_navigation">
            <span className="admin_nav_button" onClick={() => handleView("admin_items_box")}>Товары</span>
            <span className="admin_nav_button" onClick={() => handleView("admin_categories_box")}>Категории</span>
            <span className="admin_nav_button" onClick={() => handleView("admin_colors_box")}>Цвета</span>
            <span className="admin_nav_button" onClick={() => handleView("admin_sizes_box")}>Размеры</span>
            <span className="admin_nav_button" onClick={() => handleView("admin_delivery_box")}>Доставка</span>
            <span className="admin_nav_button" onClick={() => handleView("admin_orders_box")}>Заказы</span>
        </nav>
    )
};