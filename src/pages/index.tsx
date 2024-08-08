import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { wrapper } from '../store/store';
import {
  getProduct,
  getProducts,
  getRunningQueriesThunk,
} from '../service/ProductsService';
import { InferGetServerSidePropsType } from 'next';
import Layout from './layout';
import { ThemeProvider } from '../context/ThemeContext';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { searchValue, limit, page, details } = context.query;
    store.dispatch(
      getProducts.initiate({
        searchValue: searchValue?.toString() || '',
        limit: limit?.toString() || '10',
        skip: (+(limit || 10) * (+(page || 1) - 1)).toString() || '0',
      })
    );
    if (details) {
      store.dispatch(getProduct.initiate(details.toString()));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
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
      <ErrorBoundary>
        <Layout data={data} />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Home;
