export const updateUserCart = async (cart, user) => {
    if (user.token) {
        const url = 'https://miktina.herokuapp.com/backend/user/storage.php?set_cart&';
        const data = 'token=' + user.token + '&cart=' + JSON.stringify(cart);
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