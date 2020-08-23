import React, {useEffect} from 'react'
import {usePath} from "../../Service/Contexts/PathContext";
import {useUser} from "../../Service/Contexts/UserContext";
import {useDrawer} from "../../Service/Contexts/Drawer";
import {AccountDrawer} from "./AccountDrawer";

const Account = () => {
    const {setPath} = usePath();
    const {user, setStage, logout} = useUser();
    const {setStatus, status, close, setComponentRender, componentName, setComponentName} = useDrawer();
    useEffect(() => {
        setPath('/account');
    });

    const logOut = () => {
      logout();
      window.location.reload();
    };

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
                    <div className='account_left'>
                    </div>
                    <div className='account_right'>
                            <div className="account_right_title">
                                <h1>Личный кабинет</h1>
                                <h3 onClick={() => logOut()}>Выход</h3>
                            </div>
                    </div>
                </div>
            </div>
        )
}

export {Account};