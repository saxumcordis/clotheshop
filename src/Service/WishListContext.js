import React, {useCallback, useContext, useEffect, useState} from 'react';

export const WishContext = React.createContext({});

export const WishProvider = ({children}) => {
    const [wishList, setWishList] = useState(localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : []);
    const add = useCallback(product => setWishList(wishList => wishList.concat(product)), [setWishList]);
    const remove = useCallback(product => setWishList(wishList => wishList.filter(e => e !== product)), [setWishList]);
    const value = {wishList, setWishList, add, remove};
    return <WishContext.Provider value={value}>{children}</WishContext.Provider>
};

export const useWishList = () => useContext(WishContext);

export const WishConsumer = WishContext.Consumer;

export const PersistWish = () => {
    const {wishList} = useWishList();
    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(wishList))
    }, [wishList]);

    return <></>
};
