import React, {useEffect, useState} from "react";
import {useUser} from "../../Service/Contexts/UserContext";

const DeliveryTable = ({delivery}) => {

    const conditions = {
        0: "Внутри МКАДа",
        1: "До 10 КМ от МКАДа",
        2: "От 10 КМ до 20 КМ от МКАДа",
        3: "От 20 КМ до 40 КМ от МКАДа",
        4: "-"
    };

    const {isAdmin} = useUser();

    const submitChange = async (delivery_id) => {
        const newDeliveryPrice = document.getElementById(delivery_id + '_new_delivery_price').value;
        const url = 'https://miktina.herokuapp.com/backend/user/admin.php?changeDeliveryPrice&id=';
        const data = delivery_id + "&price=" + newDeliveryPrice + "&token=" + isAdmin.token;
        const response = await fetch(url + data);
        alert(await response.text());
        window.location.reload();
    };

    const tableView = () => {
        return (delivery &&
            <table>
                <thead>
                <tr>
                    <td>Type</td>
                    <td>Condition</td>
                    <td>Price</td>
                    <td>New Value</td>
                    <td>Action</td>
                </tr>
                </thead>
                {delivery.map(delivery => <tr>
                    <td style={{width: "25%"}}>{delivery.name}</td>
                    <td style={{width: "25%"}}><input type="delivery" disabled value={conditions[delivery.distance]}/></td>
                    <td style={{width: "25%"}}>{delivery.price} P </td>
                    <td style={{width: "25%"}}><input type="text" placeholder="Новая стоимость в рублях"
                                                      id={delivery.id + "_new_delivery_price"}/>
                    </td>
                    <td style={{width: "25%"}}>
                        <button onClick={() => submitChange(delivery.id)}>Сохранить</button>
                    </td>
                </tr>)}
            </table>
        )
    };

    return (
        tableView()
    )
}

export const Delivery = () => {
    const [delivery, setDelivery] = useState(0);
    const {isAdmin} = useUser();
    useEffect(() => {
        (async () => {
            const delivery = await fetch('https://miktina.herokuapp.com/backend/user/admin.php?getDelivery&token=' + isAdmin.token);
            setDelivery(await delivery.json());
        })();
    }, [setDelivery]);

    return (
        <div className="admin_delivery_box" id="admin_delivery_box">
            <DeliveryTable delivery={delivery}/>
        </div>
    )
};