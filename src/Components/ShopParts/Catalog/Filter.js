import React, {useState} from 'react';

const activeFilter = {
    'backgroundColor': '#e5e5e5',
    'borderRadius': '20px',
    'textDecoration': 'none'
};

const colorPalette = (colorCode) => {
    console.log(colorCode);
    return {
        'backgroundColor': colorCode,
        'min-width': '10px',
        'min-height': '10px',
        'display': 'block',
        'marginTop': '2.5px'
    }
};

const activeColorStyle = (activeColors, colorCode) => {
    return activeColors && (activeColors === colorCode || activeColors.includes(colorCode)) ?
        {
            'backgroundColor': '#e5e5e5',
            'borderRadius': '5px',
        } : null;
};

const Color = (color, activeColors, setActiveColor, setCheckColor) => {
    return (
        <li className="filter_element" style={activeColorStyle(activeColors, color[1])} key={color[1]} onClick={() => {
            setCheckColor(0);
            handleFilter(setActiveColor, activeColors, color[1])
        }}><span style={colorPalette(color[1])}/><span style={{marginLeft: '8px'}}>{color[0]}</span></li>
    )
};

const filterStyle = (sizeFilter, check) => {
    return sizeFilter && sizeFilter.includes(check) ? activeFilter : null;
};

const handleFilter = (setFilter, filter, newFilter) => setFilter(filter => {
    if (newFilter.length === 0)
        return [];
    if (filter.includes(newFilter))
        return filter.filter(e => e !== newFilter);

    return [...filter, newFilter]
});
const resetFilters = ({activeColors, setActiveColor, setSizeFilter, sizeFilter}) => {
    handleFilter(setActiveColor, activeColors, []);
    handleFilter(setSizeFilter, sizeFilter, [])
};

const Filter = ({activeColors, colors, setActiveColor, setSizeFilter, sizeFilter}) => {
    const [checkColor, setColor] = useState(null);
    return (
        <div className="filter_box">
            <ul className="filter">
                Размеры:
                <li className="filter_element" onClick={() => handleFilter(setSizeFilter, sizeFilter, 'small')}
                    style={filterStyle(sizeFilter, 'small')}>42-44</li>
                <li className="filter_element" onClick={() => handleFilter(setSizeFilter, sizeFilter, 'medium')}
                    style={filterStyle(sizeFilter, 'medium')}>46-48
                </li>
            </ul>
            <ul className="filter">
                Цвет:
                <li className="filter_element"
                    onClick={() => setColor(!checkColor)}>{!activeColors.length ? "Выбрать" : "Выбрать  (" + activeColors.length + ")"}</li>
                <div className="color_list" hidden={!checkColor}>
                    {colors.map(e => Color(e, activeColors, setActiveColor, setColor))}
                </div>
                {activeColors && activeColors.length !== 0 || sizeFilter && sizeFilter.length !== 0 ?
                    <li className="filter_element"
                        onClick={() => resetFilters({activeColors, setActiveColor, setSizeFilter, sizeFilter})}>Сбросить
                        фильтр</li> : null}
            </ul>
        </div>
    )
};


export {Filter}