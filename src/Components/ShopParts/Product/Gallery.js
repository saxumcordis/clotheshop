import React, {useState} from "react";

const activePicture = {
    'border': '3px solid #252525',
    'borderLeft': '4px solid #252525',
    'marginLeft': '-1px'
};

const ItemGallery = ({item}) => {
    const [activePhoto, setActivePhoto] = useState(item.picture_1);
    let gallery = [];
    for (let i = 1; i <= 8; ++i)
        if (item['picture_' + i] != 0)
            gallery.push(item['picture_' + i]);

    return (
        <div className="item_gallery">
            <div className="item_gallery_box">
                <div className="item_gallery_feed" id="igf">
                    {gallery.map(picture => <img key={gallery.indexOf(picture)} onClick={() => setActivePhoto(picture)}
                                                 style={activePhoto === picture ? activePicture : null}
                                                 className="item_picture" src={picture}/>)}
                </div>
                <div className="scroll_box">
                    <img className='button_scroll' id="down"
                         onClick={() => document.getElementById('igf').scrollTop += 112}
                         src='https://static.tildacdn.com/tild3636-3131-4463-b465-636239623632/-png-1.png'/>
                    <img className='button_scroll' id="up"
                         onClick={() => document.getElementById('igf').scrollTop -= 112}
                         src='https://static.tildacdn.com/tild3636-3131-4463-b465-636239623632/-png-1.png'/>
                </div>
            </div>
            <img className="item_head_picture" src={activePhoto}/>
        </div>
    );
};

export {ItemGallery};