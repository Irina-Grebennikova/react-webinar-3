import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
