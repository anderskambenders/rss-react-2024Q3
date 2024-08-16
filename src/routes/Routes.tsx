import Layout from '../pages/Layout';
import Main from '../pages/Main';
import ReactHookFormPage from '../pages/ReactHookForm';
import { Route, Routes } from 'react-router-dom';
import UncontrolledFormPage from '../pages/UncotrolledForm';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<Main />}></Route>
        <Route path={'react-hook-form'} element={<ReactHookFormPage />}></Route>
        <Route
          path={'uncontrolled-components-form'}
          element={<UncontrolledFormPage />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;