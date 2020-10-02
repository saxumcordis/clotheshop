import React from 'react'
import {Link} from 'react-router-dom';
import {Footer} from "./GlobalParts/Footer";


const Home = () => {
    return (
        <div className="with_footer">
            <div className="home">
                <Link to='/catalog'>
                <div className='main_picture'>
                </div>
                </Link>
                <div className='additional_pictures'>
                    <a href="https://instagram.com/miktina/"><img
                        src='https://thumb.cloud.mail.ru/weblink/thumb/xw1/4msH/3aXmqGSL5/PK_54.jpg'/></a>
                    <Link to='/catalog/category/sale/'><img
                        src='https://thumb.cloud.mail.ru/weblink/thumb/xw1/4PoA/5ua1TsxSk/PK_04.jpg'/></Link>
                </div>
                <Footer/>
            </div>
        </div>
    )
};


export {Home};