import Search from '../components/search/Search';
import ListResult from '../components/list-result/ListResult';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Flyout from '../components/flyout/Flyout';

const MainPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const page = Object.fromEntries(search).page || '1';

  const handleBack = () => {
    if (pathname !== '/') {
      navigate(`/?page=${page}`);
    }
  };

  return (
    <>
      <Search />
      <Flyout />
      <div onClick={handleBack}>
        <ListResult />
      </div>
    </>
  );
};

export default MainPage;
