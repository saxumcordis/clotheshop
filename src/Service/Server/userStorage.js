export const handleCart = (cart) => {
    return cart.length && cart.map(item => ({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
    }))
};

export const updateUserCart = async (cart, user) => {
    if (user.token) {
        const url = 'https://miktina.herokuapp.com/backend/user/storage.php?set_cart&';
        const data = 'token=' + user.token + '&cart=' + JSON.stringify(handleCart(cart));
        await fetch(url + data);
    }
};

export const updateUserWish = async (wish, user) => {
    if (user.token) {
        const url = 'https://miktina.herokuapp.com/backend/user/storage.php?set_wish&';
        const data = 'token=' + user.token + '&wish=' + JSON.stringify(wish);
        await fetch(url + data);
    }
};