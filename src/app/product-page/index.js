import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../components/navigation";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductInfo from "../../components/product-info";
import './style.css';

function ProductPage() {
  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  const select = useSelector(state => ({
    product: state.product,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <Navigation />
      <ProductInfo product={select.product}></ProductInfo>
      <button className="ProductPage-add" onClick={() => callbacks.addToBasket(id)}>Добавить</button>
    </PageLayout>
  )
}

export default memo(ProductPage);