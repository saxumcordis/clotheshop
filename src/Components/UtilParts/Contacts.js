import React, {useEffect} from 'react'
import {Header} from '../GlobalParts/Header'
import {usePath} from "../../Service/PathContext";

const Contacts = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/contacts'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className="contacts_box">
                    <h1>Контакты</h1>
                    <ul className="phones">
                        <li><a href="tel:+79651278199">+7 (965) 127-81-99</a></li>
                        <li><a href="tel:+79268472495">+7 (926) 847-24-95</a></li>
                        <li><a href="mailto: miktinaonline@gmail.com">miktinaonline@gmail.com</a></li>
                        <li><a href="https://instagram.com/miktina">Instagram @miktina</a></li>
                    </ul>
                </div>
                <img style={{maxWidth: "700px", marginLeft: "70px", maxHeight: "200px", marginTop: "30px"}} src="https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1593432477/logo_esqdc9.png"/>
            </div>
        </div>
    )
};


export {Contacts};