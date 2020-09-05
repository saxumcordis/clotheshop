import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {DrawerProvider} from "./Service/Contexts/Drawer";
import {CartProvider} from "./Service/Contexts/CartContext";
import {PathProvider} from "./Service/Contexts/PathContext";
import {UserProvider} from "./Service/Contexts/UserContext";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <DrawerProvider>
                    <App/>
                </DrawerProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
