// import Search from '../components/search/Search';
// import ListResult from '../components/list-result/ListResult';
// import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import Flyout from '../components/flyout/Flyout';
// import ThemeToggleButton from '../components/theme-toggler/ThemeToggler';
// import { useTheme } from '../context/ThemeContext';
// import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

// const MainPage = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [search] = useSearchParams();
//   const page = Object.fromEntries(search).page || '1';
//   const { theme } = useTheme();

//   const handleBack = () => {
//     if (pathname !== '/') {
//       navigate(`/?page=${page}`);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className={`app app-${theme}`}>
//         <div style={{ colorScheme: `${theme}`, position: 'relative' }}>
//           <ThemeToggleButton />
//           <Search />
//           <Flyout />
//           <div onClick={handleBack}>
//             <ListResult />
//           </div>
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default MainPage;
import Search from '../components/search/Search';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { wrapper } from '../store/store';
import { productsApi } from '../service/ProductsService';
import { InferGetServerSidePropsType } from 'next';
import Flyout from '../components/flyout/Flyout';
import ListResult from '../components/list-result/ListResult';
import ThemeToggleButton from '../components/theme-toggler/ThemeToggler';
import { useTheme } from '../context/ThemeContext';
// import ItemsList from '@/components/list-result/ItemsList';

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
  console.log(data);
  const { theme } = useTheme();
  return (
    <Provider store={store()}>
      <ErrorBoundary>
        <div className={`app app-${theme}`}>
          <div style={{ colorScheme: `${theme}`, position: 'relative' }}>
            <ThemeToggleButton />
            <Search />
            <Flyout />
            <div>
              <ListResult />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default Home;
