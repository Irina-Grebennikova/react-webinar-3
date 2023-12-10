import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from "../store/use-store";
import useSelector from '../store/use-selector';
import ProductPage from "./product-page";
import Main from "./main";
import Basket from "./basket";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;