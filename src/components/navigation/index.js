import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import './style.css';
import useSelector from "../../store/use-selector";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import Basket from "../../app/basket";

function Navigation() {

  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <nav className="Navigation">
      <Link to="/" className="Navigation-link">Главная</Link>
      <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
      />
      {select.activeModal === 'basket' && <Basket/>}
    </nav>
  );
}

export default memo(Navigation);