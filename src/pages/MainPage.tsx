import Search from '../components/search/Search';
import ListResult from '../components/list-result/ListResult';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Flyout from '../components/flyout/Flyout';
import ThemeToggleButton from '../components/theme-toggler/ThemeToggler';
import { useTheme } from '../context/ThemeContext';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

const MainPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const page = Object.fromEntries(search).page || '1';
  const { theme } = useTheme();

  const handleBack = () => {
    if (pathname !== '/') {
      navigate(`/?page=${page}`);
    }
  };

  return (
    <ErrorBoundary>
      <div className={`app app-${theme}`}>
        <div style={{ colorScheme: `${theme}`, position: 'relative' }}>
          <ThemeToggleButton />
          <Search />
          <Flyout />
          <div onClick={handleBack}>
            <ListResult />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
