import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/MainRoute';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
