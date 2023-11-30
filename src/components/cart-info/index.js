import React from 'react';
import PropTypes from 'prop-types';
import { plural, calculateTotal } from '../../utils';
import './style.css';

function CartInfo(props) {
  const total = calculateTotal(props.cart) + ' ₽';
  const count = Object.keys(props.cart).length;
  const countInfo = `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})}`;

  const mainInfo = count > 0 ? `${countInfo} / ${total}` : 'пусто';

  return (
    <div className="CartInfo">
      В корзине:
      <div className='CartInfo-mainInfo'>{mainInfo}</div>
      <button onClick={props.onOpenCart}>Перейти</button>
    </div>
  )
}

CartInfo.propTypes = {
  cart: PropTypes.shape({
    [PropTypes.number]: PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  }).isRequired,
  onOpenCart: PropTypes.func
};

CartInfo.defaultProps = {
  onOpenCart: () => {},
}

export default React.memo(CartInfo);