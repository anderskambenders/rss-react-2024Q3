import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import CardDetail from '../components/card/Card';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} errorElement={<NotFoundPage />} element={<MainPage />}>
      <Route path={`about/:productId`} element={<CardDetail />}></Route>
    </Route>
  )
);

export default router;
