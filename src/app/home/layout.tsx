import Pagination from '../../components/pagination/Pagination';
import Flyout from '../../components/flyout/Flyout';
import ListResult from '../../components/list-result/ListResult';
import Search from '../../components/search/Search';
import ThemeToggleButton from '../../components/theme-toggler/ThemeToggler';
import { IProduct } from '../../types/types';
import ThemeContainer from '../../components/theme-container/ThemeContainer';
import DetailsWithLoader from '../details/DetailsLoader';

async function getProductsCount(searchValue: string = '') {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchValue}`,
    {
      method: 'GET',
    }
  );

  const products = await response.json();
  return products.total;
}

const Layout = async ({
  searchParams,
  data,
  searchValue,
}: {
  data: IProduct[];
  searchValue: string;
  searchParams: { [key: string]: string };
}) => {
  const productsCount = await getProductsCount(searchValue);
  const { details } = searchParams;
  return (
    <ThemeContainer>
      <div style={{ position: 'relative' }}>
        <ThemeToggleButton />
        <Search />
        <Flyout />
        <div>
          <div className="result__container">
            <ListResult data={data} />
            {details && <DetailsWithLoader id={details}></DetailsWithLoader>}
          </div>

          <Pagination itemsCount={productsCount}></Pagination>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default Layout;
