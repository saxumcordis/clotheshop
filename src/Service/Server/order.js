import React from 'react';


export const enterPromo = async (token, setPromo) => {
    const promo = document.getElementById('promo_code_value').value;
    if (promo.length) {
        const response =  await fetch("https://miktina.herokuapp.com/backend/user/orders.php?usePromo&token=" + token + "&promoCode=" + promo)
        setPromo(await response.json());
    }

};