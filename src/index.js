import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {DrawerProvider} from "./Service/Drawer";
import {CartProvider} from "./Service/CartContext";
import {PathProvider} from "./Service/PathContext";

ReactDOM.render(
    <React.StrictMode>
        <DrawerProvider>
            <PathProvider>
                <App/>
            </PathProvider>
        </DrawerProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
