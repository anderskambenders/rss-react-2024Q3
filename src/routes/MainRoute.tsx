import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import Card, { loader } from '../components/card/Card';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} errorElement={<NotFoundPage />} element={<MainPage />}>
      {' '}
      <Route
        path={`about/:productId`}
        element={<Card />}
        loader={loader}
      ></Route>
    </Route>
  )
);

export default router;
