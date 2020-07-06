import React, {useState} from 'react';

const activeFilter = {
    'backgroundColor': '#e5e5e5',
    'borderRadius': '20px',
    'textDecoration': 'none'
};

const colorPalette = (colorCode) => {
    return {
        'backgroundColor': colorCode,
        'width': '10px',
        'height': '10px',
        'display': 'block',
        'marginTop': '2.5px'
    }
};

const activeColorStyle = (activeColors, colorCode) => {
    return activeColors && (activeColors === colorCode || activeColors.includes(colorCode)) ?
        {'backgroundColor': '#e5e5e5',
            'borderRadius': '5px',
        } : null;
}

const Color = (color, activeColors, setActiveColor, setCheckColor) => {
    return (
        <li className="filter_element" style={activeColorStyle(activeColors, color[1])} key={color[1]} onClick={() => {setCheckColor(0); handleFilter(setActiveColor, activeColors, color[1])}}><span style={colorPalette(color[1])}/><span style={{marginLeft: '8px'}}>{color[0]}</span></li>
    )
}

const filterStyle = (sizeFilter, check) => {
    return sizeFilter && sizeFilter.includes(check) ? activeFilter : null;
};

const handleFilter = (setFilter, filter, newFilter) => {
    setFilter(!newFilter ? 0 : !filter || filter.length === 0 ? newFilter
        : filter === newFilter ? null
    :  filter.includes(newFilter) ? () => {
                return filter.slice(0, filter.indexOf(newFilter)).concat(filter.slice(filter.indexOf(newFilter) + 1));
            } : filter.length === 2 ? filter.concat(newFilter) : [filter, newFilter])
};

const resetFilters = ({activeColors, setActiveColor, setSizeFilter, sizeFilter}) => {
    handleFilter(setActiveColor, activeColors, false);
    handleFilter(setSizeFilter, sizeFilter,false)
}

const Filter = ({activeColors, colors, setActiveColor, setSizeFilter, sizeFilter}) => {
    const [checkColor, setColor] = useState(null);
    return (
    <div className="filter_box">
        <ul className="filter">
            Размеры:
            <li className="filter_element" onClick={() => handleFilter(setSizeFilter, sizeFilter,'small')} style={filterStyle(sizeFilter, 'small')}>42-44</li>
            <li className="filter_element" onClick={() => handleFilter(setSizeFilter, sizeFilter,'medium')} style={filterStyle(sizeFilter, 'medium')}>46-48</li>
        </ul>
        <ul className="filter" >
            Цвет:
            <li className="filter_element" onClick={() => setColor(!checkColor)}>{!activeColors ? "Выбрать" : "Выбрать  (" + (Array.isArray(activeColors) ? activeColors.length : 1) + ")"}</li>
            <div className="color_list" hidden={!checkColor}>
                {colors.map(e => Color(e, activeColors, setActiveColor, setColor))}
            </div>
            {activeColors && activeColors.length !== 0 || sizeFilter && sizeFilter.length !== 0 ? <li className="filter_element" onClick={() => resetFilters({activeColors, setActiveColor, setSizeFilter, sizeFilter})}>Сбросить фильтр</li> : null}
        </ul>
    </div>
    )
};


export {Filter}