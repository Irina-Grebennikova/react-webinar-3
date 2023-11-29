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
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <List list={list} onDeleteItem={callbacks.onDeleteItem}/>
    </PageLayout>
  );
}

export default App;
