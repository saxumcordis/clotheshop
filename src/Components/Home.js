import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Footer} from "./GlobalParts/Footer";
import {usePath} from "../Service/PathContext";


const Home = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/'));
    return (
        <div className="with_footer">
            <div className="home">
                <div className='main_picture'>
                    <Link to='/catalog'><img
                        src='https://iamstudio.ru/upload/iblock/d4c/d4c974f437c38f01d84c5b5d43e6e909.jpeg'/></Link>
                </div>
                <div className='additional_pictures'>
                    <a href="https://instagram.com/miktina/"><img
                        src='https://iamstudio.ru/upload/iblock/82b/82b8598135960550d211242fc51059d2.jpg'/></a>
                    <Link to='/catalog/sale/'><img
                        src='https://iamstudio.ru/upload/iblock/2a8/2a88112d1f0bf878818272cd00f632dd.jpg'/></Link>
                </div>
                <Footer/>
            </div>
        </div>
    )
};


export {Home};