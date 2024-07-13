import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={'/'}
      errorElement={<NotFoundPage />}
      element={<MainPage />}
    ></Route>
  )
);

export default router;
