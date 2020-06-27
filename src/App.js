import React from 'react';
import {Header} from './Components/GlobalParts/Header'
import {Home} from './Components/Home.js'
import {Catalog} from "./Components/ShopParts/Catalog";
import {Delivery} from "./Components/UtilParts/Delivery";
import {Contacts} from "./Components/UtilParts/Contacts";
import {Route, Switch, BrowserRouter} from "react-router-dom"
import {About} from "./Components/UtilParts/About";
import {Account} from "./Components/UserParts/Account";
import {Wish} from "./Components/UserParts/Wish";
import {Cart} from "./Components/UserParts/Cart";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/catalog">
                        <Catalog/>
                    </Route>
                    <Route path="/delivery">
                        <Delivery/>
                    </Route>
                    <Route path="/contacts">
                        <Contacts/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/cart">
                        <Cart/>
                    </Route>
                    <Route path="/wish">
                        <Wish/>
                    </Route>
                    <Route path="/account">
                        <Account/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
