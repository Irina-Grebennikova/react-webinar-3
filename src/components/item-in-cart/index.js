import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemInCart(props) {

  const cn = bem('CartItem');

  const callbacks = {
    onDelete: useCallback(() => {
      props.onDeleteFromCart(props.item.code);
    }),
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <span className={cn('price')}>{props.item.price} ₽</span>
        <span className={cn('quantity')}>{props.item.quantity} шт</span>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemInCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onDeleteFromCart: PropTypes.func
};

ItemInCart.defaultProps = {
  onDeleteFromCart: () => {
  },
}

export default React.memo(ItemInCart);
