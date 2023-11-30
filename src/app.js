import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartInfo from './components/cart-info';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <CartInfo cart={cart}/>
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
