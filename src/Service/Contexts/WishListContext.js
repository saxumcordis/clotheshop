import React, {useCallback, useContext, useEffect, useState} from 'react';
import {updateUserWish} from "../Server/userStorage";

export const WishContext = React.createContext({});

export const WishProvider = ({children}) => {
    const [wishList, setWishList] = useState(localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : []);
    const add = useCallback(product => {
        const temp = wishList.concat(product);
        setWishList(temp);
        setTimeout(() => updateUserWish(temp, JSON.parse(localStorage.getItem('user'))), 1000);
    }, [setWishList]);
    const remove = useCallback(product => {
        const temp = wishList.filter(e => e !== product);
        setWishList(temp);
        setTimeout(() => updateUserWish(temp, JSON.parse(localStorage.getItem('user'))), 1000);
    }, [setWishList]);
    const countWishItems = wishList.length;
    const value = {wishList, setWishList, add, remove, countWishItems};
    return <WishContext.Provider value={value}>{children}</WishContext.Provider>
};

export const useWishList = () => useContext(WishContext);

export const PersistWish = () => {
    const {wishList} = useWishList();
    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(wishList))
    }, [wishList]);

    return <></>
};
