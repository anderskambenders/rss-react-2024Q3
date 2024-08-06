import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { wrapper } from '../store/store';
import { productsApi } from '../service/ProductsService';
import { InferGetServerSidePropsType } from 'next';
import Layout from './layout';
import { ThemeProvider } from '../context/ThemeContext';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { searchValue, limit, page, details } = context.query;
    store.dispatch(
      productsApi.endpoints.getProducts.initiate({
        searchValue: searchValue?.toString() || '',
        limit: limit?.toString() || '10',
        skip: (+(limit || 10) * (+(page || 1) - 1)).toString() || '0',
      })
    );
    if (details) {
      store.dispatch(
        productsApi.endpoints.getProduct.initiate(details.toString())
      );
    }

    await Promise.all(
      store.dispatch(productsApi.util.getRunningQueriesThunk())
    );
    return {
      props: {
        data: {
          cardsData: store.getState().products.products,
          cardsCount: store.getState().products.productsCount,
          detailsData: store.getState().products.product,
        },
      },
    };
  }
);

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ThemeProvider>
      <Provider store={store()}>
        <ErrorBoundary>
          <Layout data={data} />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
};

export default Home;
