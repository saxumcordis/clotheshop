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
                        src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1601906968/homepage/PK_54_gqfrn3.jpg'/></a>
                    <Link to='/catalog/category/sale/'><img
                        src='https://res.cloudinary.com/dkm4iuk9tbiqnuar/image/upload/v1601906988/homepage/PK_04_yupcfw.jpg'/></Link>
                </div>
                <Footer/>
            </div>
        </div>
    )
};


export {Home};