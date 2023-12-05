import { useCallback, useContext, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import useStore from "../store/use-store";
import { router } from '../router';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
