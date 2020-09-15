import React from "react";

export const SaleView = ({sale, totalSum}) => {

    const levels = [
        {start: 0, sale: 0,},
        {start: 48000, sale: 5,},
        {start: 93000, sale: 10,},
        {start: 150000, sale: 15},
    ];

    const steps = levels.map(e => totalSum > e.start);

    return (<div className="account_left_sale">
        <div className="account_left_sale_info">
            <h1>Ваша скидка: {sale} %</h1>
            <span>Вы совершили покупки на сумму {totalSum} Р.
            <p>Следующий уровень скидки — {totalSum && levels.find(e => totalSum < e.start).start} Р.</p></span>
        </div>
        <div className="account_left_sale_levels">
            <div className="account_left_sale_line">
                <span/></div>
            <div className="account_left_sale_line_active" style={{
                background: "#444",
                width: totalSum >= 150000 ? "100%" : (((totalSum / 150000 * 100) % 100)) + "%"
            }}>
                <span/></div>
            <ul>
                <li>
                    <span style={steps[0] ? {color: "#444"} : null}>0%</span></li>
                <li>
                    <span style={steps[1] ? {color: "#444"} : null}>5%</span> <i
                    style={steps[1] ? {color: "#444"} : null}>48000 P</i></li>
                <li>
                    <span style={steps[2] ? {color: "#444"} : null}>10%</span> <i
                    style={steps[2] ? {color: "#444"} : null}>93000 P</i></li>
                <li>
                    <span style={steps[3] ? {color: "#444"} : null}>15%</span> <i
                    style={steps[3] ? {color: "#444"} : null}>150000 P</i></li>
            </ul>
        </div>
    </div>)
};
