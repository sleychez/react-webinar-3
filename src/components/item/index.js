import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Item(props) {

    const cn = bem("Item");

    const callbacks = {
        onClick: (e) => {
            e.stopPropagation();
            props.onClick(props.item.code);
        },
    };

    return (
        <div className={cn()}>
            <div className={cn("code")}>{props.item.code}</div>
            <div className={cn("title")}>{props.item.title}</div>
            <div className={cn("price")}>
                {props.item.price.toLocaleString()} ₽
            </div>
            {props.item.count && (
                <div className={cn("count")}>{props.item.count} шт</div>
            )}
            <div className={cn("actions")}>
                <button className={cn("button")} onClick={callbacks.onClick}>{props.buttonText}</button>
            </div>
        </div>
    );
}


Item.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func
};

export default React.memo(Item);
