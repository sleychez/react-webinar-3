import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { useParams } from "react-router-dom";
import ControlLayout from "../../components/control-layout";
import Product from "../../components/product";
import CurrentPage from "../../components/currentPage";



function CardProduct() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    cardProduct: state.cardProduct.cardProduct
  }));

  useEffect(() => {
    store.actions.modals.close();
    store.actions.cardProduct.load(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.cardProduct.title} />
      <ControlLayout>
        <CurrentPage/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ControlLayout>
      <Product product={select.cardProduct} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(CardProduct);