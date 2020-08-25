import {useUser} from "../../../Service/Contexts/UserContext";
import React from 'react';


export const AddressEdit = () => {
    const {personal, setPersonal} = useUser();

    return (
        <div className="account_right_address_edit">

        </div>
    );
};