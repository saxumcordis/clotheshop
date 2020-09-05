import React, {useEffect, useState} from 'react';


export const Categories = () => {


    return (
        <div className="admin_categories_box" id="admin_categories_box">
            category
        </div>
    )
};


const ColorsTable = ({colors}) => {
    return (
        colors && colors.map(e => e.color_name)
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
        </div>
    )
};