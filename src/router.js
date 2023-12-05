import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProductPage from "./app/product-page";
import Main from "./app/main";

const routes = (
  <>
    <Route path="/" element={<Main />}/>
    <Route path="/product/:id" element={<ProductPage />} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export { router };
