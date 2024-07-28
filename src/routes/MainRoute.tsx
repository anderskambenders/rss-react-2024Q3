import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import CardDetail from '../components/card/CardDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path={'/'} element={<MainPage />}>
        <Route path={`about/:productId`} element={<CardDetail />}></Route>
      </Route>
    </Route>
  )
);

export default router;
