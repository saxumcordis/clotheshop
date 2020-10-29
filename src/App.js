import React, {useEffect} from 'react';
import {Header} from './Components/GlobalParts/Header'
import {Home} from './Components/Home.js'
import {Catalog} from "./Components/ShopParts/Catalog/Catalog";
import {Delivery} from "./Components/UtilParts/Delivery";
import {Contacts} from "./Components/UtilParts/Contacts";
import {Route, Switch,useLocation} from "react-router-dom"
import {About} from "./Components/UtilParts/About";
import {Account} from "./Components/UserParts/Account/Account";
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
import {PersistUser, useUser} from "./Service/Contexts/UserContext";
import {Policy} from "./Components/UtilParts/Policy";
import {Order} from "./Components/ShopParts/Order/Order";
//import Style from "./Styles/MediaStyle";
//import AppleStyle from "./Styles/MediaApple.css";
import {AdminPage} from "./Components/AdminPart/AdminPage";
import {validateSession} from "./Service/Validation/sessionValidation";
import {OrderProvider, PersistOrder} from "./Service/Contexts/OrderContext";

function App() {
    const {status} = useDrawer();
    const location = useLocation();
    const {user, setUser} = useUser();

    useEffect(function() {validateSession(user, setUser)}, [setUser]);

    return (
        <div>
                <WishProvider>
                    <CartProvider>
                        <OrderProvider>
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
                                <Route exact path="/order">
                                    <Title title="Оформление заказа">
                                        <Order/>
                                    </Title>
                                </Route>
                                <Route exact path="/miktinaAdminPageService">
                                    <Title title="Панель администратора">
                                        <AdminPage/>
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
                            {location.pathname !== "/" ? <Footer/> : null}
                            <PersistWish/>
                            <PersistCart/>
                            <PersistUser/>
                            <PersistOrder/>
                            <Drawer state={status}/>
                        </OrderProvider>
                    </CartProvider>
                </WishProvider>
        </div>
    );
}

export default App;
