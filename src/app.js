import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartInfo from './components/cart-info';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    onDeleteFromCart: useCallback(code => {
      store.deleteItemFromCart(code);
    }, [store]),

    onOpenCart: useCallback(() => {
      setIsCartOpen(true);
    }),

    onCloseCart: useCallback(() => {
      setIsCartOpen(false);
    }),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <CartInfo cart={cart} onOpenCart={callbacks.onOpenCart} />
      <CartModal
        cart={cart}
        open={isCartOpen}
        onCloseCart={callbacks.onCloseCart}
        onDeleteFromCart={callbacks.onDeleteFromCart}
      />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
