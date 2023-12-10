import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import NavBar from "../../components/nav-bar";
import NavLinks from "../../components/nav-links";

function ProductPage() {
  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <NavBar>
        <NavLinks />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavBar>
      <ProductInfo product={select.product} addToBasket={callbacks.addToBasket}></ProductInfo>
    </PageLayout>
  )
}

export default memo(ProductPage);