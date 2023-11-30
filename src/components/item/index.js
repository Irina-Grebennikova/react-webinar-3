import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAddToCart: () => {
      props.onAddToCart(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <span className={cn('price')}>{props.item.price} ₽</span>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {
  },
}

export default React.memo(Item);
