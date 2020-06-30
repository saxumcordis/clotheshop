import React from 'react';
import {Header} from './Components/GlobalParts/Header'
import {Home} from './Components/Home.js'
import {Catalog} from "./Components/ShopParts/Catalog/Catalog";
import {Delivery} from "./Components/UtilParts/Delivery";
import {Contacts} from "./Components/UtilParts/Contacts";
import {Route, Switch, BrowserRouter} from "react-router-dom"
import {About} from "./Components/UtilParts/About";
import {Account} from "./Components/UserParts/Account";
import {Wish} from "./Components/UserParts/Wish";
import {Cart} from "./Components/UserParts/Cart";
import Title from "react-document-title";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/catalog">
                        <Title title="Каталог">
                            <Catalog/>
                        </Title>
                    </Route>
                    <Route path="/delivery">
                        <Title title="Доставка">
                            <Delivery/>
                        </Title>
                    </Route>
                    <Route path="/contacts">
                        <Title title="Контакты">
                            <Contacts/>
                        </Title>
                    </Route>
                    <Route path="/about">
                        <Title title="О нас">
                            <About/>
                        </Title>
                    </Route>
                    <Route path="/cart">
                        <Title title="Корзина">
                            <Cart/>
                        </Title>
                    </Route>
                    <Route path="/wish">
                        <Title title="Список желаемого">
                            <Wish/>
                        </Title>
                    </Route>
                    <Route path="/account">
                        <Title title="Личный кабинет">
                            <Account/>
                        </Title>
                    </Route>
                    <Route exact path="/">
                        <Title title="MIKTINA">
                            <Home/>
                        </Title>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
