import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import Head from '../head';
import ItemInCart from '../item-in-cart';
import { calculateTotal } from '../../utils';
import './style.css';

function CartModal(props) {

  const cn = bem('CartModal');

  const total = calculateTotal(props.cart) + ' ₽';

  const callbacks = {
    onDeleteFromCart: useCallback(code => {
      props.onDeleteFromCart(code);
    }),

    onCloseCart: useCallback(() => {
      props.onCloseCart();
    }),
  }

  const items = Object.values(props.cart).map(item => (
    <ItemInCart key={item.code} item={item} onDeleteFromCart={callbacks.onDeleteFromCart} />
  ));

  const content = items.length > 0 ? 
    <>
      <div className={cn('items')}>{items}</div>
      <div className={cn('total')}>Итого <b>{total}</b></div>
    </> :
    <p className={cn('empty')}>Корзина пуста</p>

  return (
    <dialog className={cn()} open={props.open}>
      <main className={cn('container')}>
        <Head title='Корзина' buttonText={'Закрыть'} buttonOnClick={callbacks.onCloseCart} />
        {content}
      </main>
    </dialog>
  )
}

CartModal.propTypes = {
  cart: PropTypes.shape({
    [PropTypes.number]: PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  }).isRequired,
  open: PropTypes.bool,
  onCloseCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func
}

CartModal.defaultProps = {
  open: false,
  onCloseCart: () => {},
  onDeleteFromCart: () => {},
}

export default React.memo(CartModal);