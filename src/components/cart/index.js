import React from "react";
import "./style.css";
import List from "../list";
import Head from "../head";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {getTotalPrice} from "../../utils";

function Cart({cartList, DeleteCartItem, buttonText, isModalOpen, setIsModalOpen}) {

    const cn = bem("Cart");

    return (
        <div className={`${cn()} ${isModalOpen && cn("modal")}`}>
            <div className={cn("container")}>
                <Head title="Корзина">
                    <button
                        className={cn("button")}
                        onClick={() => {
                            setIsModalOpen(false)
                        }}>Закрыть
                    </button>
                </Head>
                <div className={cn("info")}>
                    <List
                        list={cartList}
                        onClick={DeleteCartItem}
                        buttonText={buttonText}/>
                </div>
                <div className={cn("totalPrice")}>Итого
                    <span>{getTotalPrice(cartList)} ₽</span>
                </div>
            </div>
        </div>
    );
}

Cart.propTypes = {
    cartList: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number
        })
    ).isRequired,
    buttonText: PropTypes.string,
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    DeleteCartItem: PropTypes.func
};


export default React.memo(Cart);