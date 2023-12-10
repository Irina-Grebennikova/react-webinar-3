import { memo } from "react";
import { numberFormat } from "../../utils";
import './style.css';

function ProductInfo({ product, addToBasket }) {
  const { description, madeIn, edition, price, category } = product;

  return (
    <div className="ProductInfo">
      <p>{description}</p>
      <p>Страна производитель: <b>{madeIn?.title} ({madeIn?.code})</b></p>
      <p>Категория: <b>{category?.title}</b></p>
      <p>Год выпуска: <b>{edition}</b></p>
      <p>
        <strong className="ProductInfo-price">Цена: {numberFormat(price)} ₽</strong>
      </p>
      <button onClick={() => addToBasket(product)}>Добавить</button>
    </div>
  )
}

export default memo(ProductInfo);