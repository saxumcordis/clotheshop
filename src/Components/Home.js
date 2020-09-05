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
                        src='https://iamstudio.ru/upload/iblock/82b/82b8598135960550d211242fc51059d2.jpg'/></a>
                    <Link to='/catalog/sale/'><img
                        src='https://iamstudio.ru/upload/iblock/214/21451daef777285a22ff628df6dbdd26.jpg'/></Link>
                </div>
                <Footer/>
            </div>
        </div>
    )
};


export {Home};