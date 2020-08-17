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
import {PersistWish, WishProvider} from "./Service/WishListContext";
import {CartProvider, PersistCart} from "./Service/CartContext";
import {useDrawer} from "./Service/Drawer";
import {Drawer} from "./Components/SystemParts/Drawer";
import {ItemPreview} from "./Components/ShopParts/Product/ItemPreview";


function App() {
    const [currentPath, setPath] = useState(window.location.pathname);
    const {status} = useDrawer();
    return (
        <div>
            <BrowserRouter>
                <WishProvider>
                    <CartProvider>
                        <Header/>
                        <Switch>
                            <Route exact path="/catalog">
                                <Title title="Каталог">
                                    <Catalog setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/delivery">
                                <Title title="Доставка">
                                    <Delivery setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/contacts">
                                <Title title="Контакты">
                                    <Contacts setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/about">
                                <Title title="О нас">
                                    <About setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/cart">
                                <Title title="Корзина">
                                    <Cart setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/wish">
                                <Title title="Список желаний">
                                    <Wish setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/account">
                                <Title title="Личный кабинет">
                                    <Account setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route path="/catalog/item/:id">
                                <Title title="Просмотр">
                                    <Product setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route exact path="/">
                                <Title title="MIKTINA">
                                    <Home setPath={setPath}/>
                                </Title>
                            </Route>
                            <Route exact path="*">
                                <Title title="Страницы не существует">
                                    <NotFound setPath={setPath}/>
                                </Title>
                            </Route>
                        </Switch>
                        {currentPath !== "/" ? <Footer/> : null}
                        <PersistWish/>
                        <PersistCart/>
                        <Drawer state={status}/>
                    </CartProvider>
                </WishProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
