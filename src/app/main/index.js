import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import NavBar from '../../components/nav-bar';
import NavLinks from '../../components/nav-links';
import { PER_PAGE } from '../../constants';

function Main() {

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  useEffect(() => {
    const newPage = +searchParams.get('page') || 1;

    store.actions.catalog.load(newPage);
    setCurrentPage(newPage);
  }, [searchParams]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    list: state.catalog.list,
    totalCount: state.catalog.totalCount
  }));

  const lastPage = Math.ceil(select.totalCount / PER_PAGE);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} path={`/product/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <NavBar>
        <NavLinks />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavBar>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} lastPage={lastPage}/>
    </PageLayout>
  );
}

export default memo(Main);
