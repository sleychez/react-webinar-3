import React, {useCallback, useState} from "react";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {list, cartList} = store.getState();

    const callbacks = {
        AddToCart: useCallback(
            (code) => {
                store.addToCart(code);
            },
            [store]
        ),

        DeleteCartItem: useCallback(
            (code) => {
                store.deleteCartItem(code);
            },
            [store]
        ),
    };


    return (
        <PageLayout>
            <Head title="Магазин"/>
            <Controls cartList={cartList} setIsModalOpen={setIsModalOpen}/>
            <List
                list={list}
                onClick={callbacks.AddToCart}
                buttonText={"Добавить"}
            />
            <Cart
                cartList={cartList}
                isModalOpen={isModalOpen}
                DeleteCartItem={callbacks.DeleteCartItem}
                setIsModalOpen={setIsModalOpen}
                buttonText={"Удалить"}
            />
        </PageLayout>
    )
}

export default App;
