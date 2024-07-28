import { RouterProvider } from 'react-router-dom';
import './app.css';
import router from './routes/MainRoute';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
