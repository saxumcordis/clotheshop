import React, {useState} from 'react';
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
import {Footer} from "./Components/GlobalParts/Footer";
import {Product} from "./Components/ShopParts/Product/Product";
import {NotFound} from "./Components/SystemParts/NotFound";
import {PersistWish, WishProvider} from "./Service/Contexts/WishListContext";
import {CartProvider, PersistCart} from "./Service/Contexts/CartContext";
import {useDrawer} from "./Service/Contexts/Drawer";
import {Drawer} from "./Components/SystemParts/Drawer";
import {usePath} from "./Service/Contexts/PathContext";
import {PersistUser, UserProvider} from "./Service/Contexts/UserContext";
import {Policy} from "./Components/UtilParts/Policy";


function App() {
    const {path} = usePath();
    const {status} = useDrawer();
    return (
        <div>
            <BrowserRouter>
                <WishProvider>
                    <CartProvider>
                        <UserProvider>
                            <Header/>
                            <Switch>
                                <Route exact path="/catalog">
                                    <Title title="Каталог">
                                        <Catalog/>
                                    </Title>
                                </Route>
                                <Route path="/catalog/category/:id">
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
                                <Route exact path="/about">
                                    <Title title="О нас">
                                        <About/>
                                    </Title>
                                </Route>
                                <Route exact path="/about/policy">
                                    <Title title="Юридическая информация">
                                        <Policy/>
                                    </Title>
                                </Route>
                                <Route path="/cart">
                                    <Title title="Корзина">
                                        <Cart/>
                                    </Title>
                                </Route>
                                <Route path="/wish">
                                    <Title title="Список желаний">
                                        <Wish/>
                                    </Title>
                                </Route>
                                <Route path="/account">
                                    <Title title="Личный кабинет">
                                        <Account/>
                                    </Title>
                                </Route>
                                <Route path="/catalog/item/:id">
                                    <Title title="Просмотр">
                                        <Product/>
                                    </Title>
                                </Route>
                                <Route exact path="/">
                                    <Title title="MIKTINA">
                                        <Home/>
                                    </Title>
                                </Route>
                                <Route exact path="*">
                                    <Title title="Страницы не существует">
                                        <NotFound/>
                                    </Title>
                                </Route>
                            </Switch>
                            {path !== "/" ? <Footer/> : null}
                            <PersistWish/>
                            <PersistCart/>
                            <PersistUser/>
                            <Drawer state={status}/>
                        </UserProvider>
                    </CartProvider>
                </WishProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
