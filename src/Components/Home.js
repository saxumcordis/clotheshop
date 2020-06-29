import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className='main_picture'>
                <Link to='/catalog'><img
                    src='https://iamstudio.ru/upload/iblock/5ca/5ca90b8dea2fe76a9eb53b8bb3a50d7a.jpg'/></Link>
            </div>
            <div className='additional_pictures'>
                <a href="https://instagram.com/miktina/"><img
                                                              src='https://iamstudio.ru/upload/iblock/82b/82b8598135960550d211242fc51059d2.jpg'/></a>
                <Link to='/catalog/sale/'><img
                    src='https://iamstudio.ru/upload/iblock/2a8/2a88112d1f0bf878818272cd00f632dd.jpg'/></Link>
            </div>
        </div>
    )
}


export {Home};