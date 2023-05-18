import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onClick, buttonText}) {
    return (
        <div>
            {list.map((item) => (
                <div key={item.code} className="List-item">
                    <Item item={item} onClick={onClick} buttonText={buttonText}/>
                </div>
            ))}
        </div>
    );
}

List.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number
        })
    ).isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string
};


export default React.memo(List);
