import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path={'/'} element={<MainPage />}></Route>)
);

export default router;
