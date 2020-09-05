import React from 'react';

export const validateSession = async (user, setUser) => {
    if (user !== 'guest') {
        const url = 'https://miktina.herokuapp.com/backend/user/account.php?token=';
        const data = user.token;
        const response = await fetch(url + data);
        if (await response.json() === 0)
                setUser('guest');
    }
};