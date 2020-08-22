export const updateUserCart = async (cart, user) => {
    if (user.token) {
        const url = 'https://miktina.herokuapp.com/backend/user/storage.php?set_cart&';
        const data = 'token=' + user.token + '&cart=' + JSON.stringify(cart);
        await fetch(url + data);
    }
};