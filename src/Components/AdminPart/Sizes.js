import React, {useEffect, useState} from "react";
import {useUser} from "../../Service/Contexts/UserContext";


const SizesTable = ({sizes}) => {
    const {isAdmin} = useUser();

    const submitChange = () => {

    }

    const removeSize = () => {

    }

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
                    <td style={{width: "25%"}}>{size.name.split('_')[0]}</td>
                    <td style={{width: "25%"}}><input type="text" placeholder={size.name.split('_')[0]}
                                                      id={size.id + "_new_size_name"}/>
                    </td>
                    <td style={{width: "25%"}}>
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
            <SizesTable sizes={sizes}/>
        </div>
    )
};