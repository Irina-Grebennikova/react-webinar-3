import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Navigation from '../../components/navigation';
import Pagination from '../../components/pagination';
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
    list: state.catalog.list,
    totalCount: state.catalog.totalCount
  }));

  const lastPage = Math.ceil(select.totalCount / PER_PAGE);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Navigation />
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} lastPage={lastPage}/>
    </PageLayout>
  );
}

export default memo(Main);
