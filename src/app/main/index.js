import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ControlLayout from "../../components/control-layout";
import Pagination from "../../components/pagination";
import CurrentPage from "../../components/currentPage";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    totalPage: state.catalog.totalPage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback((page) => store.actions.catalog.load(page), [])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item}
                   onAdd={callbacks.addToBasket}
                   link={`/card-product/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <ControlLayout>
        <CurrentPage/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ControlLayout>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        page={select.page}
        totalPage={select.totalPage}
        onHandleChangePage={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);
