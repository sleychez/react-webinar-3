import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {getTotalPrice, plural} from "../../utils";

function Controls({cartList, setIsModalOpen}) {

    const cn = bem("Controls");

    return (
        <div className={cn()}>
            <div className={cn("cart")}>
                В корзине:
                <span className={cn("total")}>
          {cartList.length
              ? `${cartList.length} ${plural(cartList.length, {
                  one: "товар",
                  few: "товара",
                  many: "товаров",
              })} / ${getTotalPrice(cartList)} ₽`
              : "пусто"}
        </span>
            </div>
            <button
                className={cn("button")}
                onClick={() => {
                    setIsModalOpen(true);
                }}>Перейти
            </button>
        </div>
    );
}


Controls.propTypes = {
    cartList: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number
        })
    ).isRequired,
    setIsModalOpen: PropTypes.func
};


export default React.memo(Controls);
