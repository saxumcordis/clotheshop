import React, {useEffect} from 'react';
import {useWishList} from "./WishListContext";


export const PersistWish = () => {
    const {wishList} = useWishList();
    useEffect(() => {
        localStorage.setItem('wishList', wishList)
    }, [wishList]);

    return <></>
};
