import React, {useEffect} from 'react';
import {useUser} from "../../Service/Contexts/UserContext";
import {loginAdmin} from "../../Service/Server/login";
import {ItemList} from "./ItemList";
import {Navigation} from "./Navigation";
import {Colors} from "./Colors";
import {Categories} from "./Categories";
import {Delivery} from "./Delivery";
import {Orders} from "./Orders";
import {Sizes} from "./Sizes";

const AdminLogin = () => {

    const {stageStatus, setStageStatus, setAdmin, isAdmin} = useUser();

    useEffect(() => {
        if (stageStatus.token && !isAdmin) {
            setAdmin(stageStatus);
        }
    }, [stageStatus]);

    const sendLogin = () => {
        const data = loginAdmin();
        (async () => {
            const response = await fetch(data);
            if (!stageStatus) {
                setStageStatus(await response.json());
            }
        })();
    };

    return (
        <div className="with_footer">
            <div className="global_giv">
                <div className="login_form">
                    <input type="email" id="login_email" placeholder="MIKTINA" name="user_login" required/>
                    <input type="password" id="login_password" placeholder="MIKTINA" name="user_pass" required/>
                    <input type="submit" style={{color: "white"}} className="login_button" value="Войти"
                           onClick={() => sendLogin()}/>
                </div>
            </div>
        </div>
    )
};

export const AdminPage = () => {
    const {isAdmin, setAdmin} = useUser();

    useEffect(() => {
        if (isAdmin) {
            const url = 'https://miktina.herokuapp.com/backend/user/admin.php?login&admincheck&email&password&token=';
            fetch(url + isAdmin.token).then(response => response.json()).then(response => setAdmin(response));
        }
    }, [setAdmin]);

    if (!isAdmin) {
        return (<AdminLogin/>)
    }

    return (
        <div className="with_footer">
            <div className="global_giv">
                <div className="admin_page">
                    <Navigation/>
                    <ItemList/>
                    <Categories/>
                    <Colors/>
                    <Sizes/>
                    <Delivery/>
                    <Orders/>
                </div>
            </div>
        </div>
    )
};