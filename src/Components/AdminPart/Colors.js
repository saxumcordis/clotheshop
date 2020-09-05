import React, {useEffect, useState} from "react";

const ColorsTable = ({colors}) => {

    const submitChange = () => {

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
                    <td style={{width: "25%"}}><input type="text" placeholder={color.color_name}/><input type="color" defaultValue={color.color_code}/> </td>
                    <td style={{widht: "25%"}}><button onClick={() => submitChange()}>Сохранить</button></td>
                </tr>)}
            </table>
        )
    };

    return (
        tableView()
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