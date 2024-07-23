import Search from '../components/search/Search';
import ListResult from '../components/list-result/ListResult';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
      <div onClick={handleBack}>
        <ListResult />
      </div>
    </>
  );
};

export default MainPage;
