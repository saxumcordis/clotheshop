import {useUser} from "../../Service/Contexts/UserContext";
import React from "react";
import {RegisterDrawer} from "./Connection/Register";
import {LoginDrawer} from "./Connection/Login";
import {RestoreDrawer} from "./Connection/Restore";
import {StatusRegisterDrawer} from "./Connection/Status/RegisterStatus";
import {StatusLoginDrawer} from "./Connection/Status/LoginStatus";


export const AccountDrawer = () => {
    const {stage} = useUser();
    return (
        <div className="account_drawer">
            {stage === 'login' ? <LoginDrawer/>
                : stage === 'register' ? <RegisterDrawer/>
                    : stage === 'registered' ? <StatusRegisterDrawer/>
                    : stage === 'logged' ? <StatusLoginDrawer/>
                        : <RestoreDrawer/>}
        </div>
    )
};