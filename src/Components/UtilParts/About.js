import React, {useEffect} from 'react'
import {usePath} from "../../Service/Contexts/PathContext";

const About = () => {
    const {setPath} = usePath();
    useEffect(() => setPath('/about'));
    return (
        <div className='with_footer'>
            <div className='global_giv'>
                <div className='about_box'>
                    <p>
                        <strong>Команда MIKTINA не представляет себя без движения и развития.</strong>
                        <br/>
                        <br/>
                        Мы считаем, что мобильность и комфорт очень важны в современной жизни, поэтому cоздаём одежду,
                        которая сочетает в себе лаконичный стиль и удобство.
                    </p>
                </div>
                <img style={{maxWidth: "500px", maxHeight: "500px", borderRadius: "5px", marginLeft: "30px", marginTop: "30px"}}
                    src="https://instagram.fhel6-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/90402773_1359975907539567_1741321515863270435_n.jpg?_nc_ht=instagram.fhel6-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=x3oIzXolyJ0AX-CNQwP&oh=2e28ae639bf8424facc2482d266bc907&oe=5F5A1319"/>
            </div>
        </div>
    )
};


export {About};