import React, {useState} from 'react'


const Footer = () => {
    return (
        <div className="footer">
            <div className="company">© 2020 MIKTINA</div>
            <div className="social">
                <a href="https://instagram.com/miktina/"><span className="social_text"><img src="https://image.flaticon.com/icons/png/512/87/87390.png"/> INSTAGRAM</span></a>
                <a href="https://api.whatsapp.com/send?phone=89651278199"><span className="social_text"><img src="https://cdn.onlinewebfonts.com/svg/img_24852.png"/> WHATSAPP</span></a>
            </div>
        </div>
    )
};

export {Footer};