import React from 'react'


const Footer = () => {
    return (
        <div className="footer">
            <div className="company">© 2020 MIKTINA</div>
            <div className="social">
                <a href="https://instagram.com/miktina/"><span className="social_text"><img src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649932/87390_rx5yxe.png"/> INSTAGRAM</span></a>
                <a href="https://api.whatsapp.com/send?phone=89651278199"><span className="social_text"><img src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1594649946/img_24852_aefomf.png"/> WHATSAPP</span></a>
            </div>
        </div>
    )
};

export {Footer};