import React, {useEffect} from 'react'
import {usePath} from "../../Service/Contexts/PathContext";
import {useUser} from "../../Service/Contexts/UserContext";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {AccountDrawer} from "./AccountDrawer";

const Account = () => {
    const {setPath} = usePath();
    const {user, setStage} = useUser();
    const {setStatus, status, close, setComponentRender, componentName, setComponentName} = useDrawer();
    useEffect(() => {
        setPath('/account');
    });
    console.log(user);
    if (user === 'guest')
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    <p>Вы не авторизованы.</p>
                </div>
            </div>
        );
    else
        return (
            <div className='with_footer'>
                <div className='global_giv'>
                    account
                </div>
            </div>
        )
}

export {Account};