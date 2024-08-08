import type { AppProps } from 'next/app';
import '../index.css';
import '../app.css';
import '../pages/not-found.css';
import '../components/card/card-detail.css';
import '../components/flyout/flyout.css';
import '../components/list-result/card.css';
import '../components/list-result/list-result.css';
import '../components/loader/loader.css';
import '../components/pagination/pagination.css';
import '../components/search/search.css';
import '../components/theme-toggler/theme-toggler.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
