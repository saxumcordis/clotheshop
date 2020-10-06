import React, {useState} from 'react';

const activeFilter = {
    'backgroundColor': '#e5e5e5',
    'borderRadius': '20px',
    'textDecoration': 'none'
};

const colorPalette = (colorCode) => {
    return {
        'backgroundColor': colorCode
    }
};

const activeStyle = (activeArray, item) => {
    return activeArray && (activeArray === item || activeArray.includes(item)) ?
        {
            'backgroundColor': '#e5e5e5',
            'borderRadius': '5px',
        } : null;
};

const Color = ({color, activeColors, setActiveColor, setCheckColor}) => {
    return (
        <li className="filter_element color_item" style={activeStyle(activeColors, color[1])} key={color[1]} onClick={() => {
            setCheckColor(0);
            handleFilter(setActiveColor, activeColors, color[1])
        }}><span className="color_palette" style={colorPalette(color[1])}/><span style={{marginLeft: '8px'}}>{color[0]}</span></li>
    )
};

const handleFilter = (setFilter, filter, newFilter) => setFilter(filter => {
    if (newFilter.length === 0)
        return [];
    if (filter.includes(newFilter))
        return filter.filter(e => e !== newFilter);
    return [...filter, newFilter]
});
const resetFilters = ({activeColors, setActiveColor, setActiveSizes, size}) => {
    handleFilter(setActiveColor, activeColors, []);
    handleFilter(setActiveSizes, size, [])
};

const Size = ({size, activeSizes, setActiveSize, setCheckSize}) => {
    return (
        <li className="filter_element size_item" style={activeStyle(activeSizes, size)} key={size} onClick={() => {
            setCheckSize(0);
            handleFilter(setActiveSize, activeSizes, size)
        }}><span>{size}</span></li>
    )
};

const Filter = ({activeColors, colors, setActiveColor, setActiveSizes, activeSizes, sizes, sort, setSort}) => {
    const [checkColor, setColor] = useState(null);
    const [checkSize, setSize] = useState(null);
    const [checkSort, setSortCheck] = useState(null);

    return (
        <div className="filter_box">
            <ul className="filter">
                Размеры:
                <li className="filter_element select"
                    onClick={() => setSize(!checkSize)}>{!activeSizes.length ? "Выбрать" : "Выбрать  (" + activeSizes.length + ")"}</li>
                <div className="color_list" hidden={!checkSize}>
                    {sizes.map((e, i) => <Size size={e} key={i} activeSizes={activeSizes} setActiveSize={setActiveSizes} setCheckSize={setSize}/>)}
                </div>
            </ul>
            <ul className="filter color">
                Цвет:
                <li className="filter_element select"
                    onClick={() => setColor(!checkColor)}>{!activeColors.length ? "Выбрать" : "Выбрать  (" + activeColors.length + ")"}</li>
                <div className="color_list" hidden={!checkColor}>
                    {colors.map((e, i) => <Color key={e + i} color={e} activeColors={activeColors} setActiveColor={setActiveColor} setCheckColor={setColor}/>)}
                </div>
                {activeColors && activeColors.length !== 0 || sizes && sizes.length !== 0 ?
                    <li className="filter_element reset"
                        onClick={() => resetFilters({activeColors, setActiveColor, setActiveSizes, sizes})}>Сбросить
                        фильтр</li> : null}
            </ul>
            <ul className="filter sort">
                Сортировка:
                <li className="filter_element" onClick={() => setSortCheck(!checkSort)}>{sort.name}</li>
                <div className="color_list" hidden={!checkSort}>
                    <li className="filter_element" style={{width: "200px"}}
                        onClick={() => {setSort({name: 'По цене (по возрастанию)', type: 'price', dir: 'asc'}); setSortCheck(!checkSort)}}>По цене
                        (по возрастанию)
                    </li>
                    <li className="filter_element" style={{width: "200px"}}
                        onClick={() => {setSort({name: 'По цене (по убыванию)', type: 'price', dir: 'desc'}); setSortCheck(!checkSort)}}>По цене (по
                        убыванию)
                    </li>
                </div>
            </ul>
        </div>
    )
};


export {Filter}