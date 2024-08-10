import Pagination from 'src/components/pagination/Pagination';
import Flyout from '../../components/flyout/Flyout';
import ListResult from '../../components/list-result/ListResult';
import Search from '../../components/search/Search';
import ThemeToggleButton from '../../components/theme-toggler/ThemeToggler';
import { IProduct } from '../../types/types';

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
  data,
  searchValue,
}: {
  data: IProduct[];
  searchValue: string;
}) => {
  const productsCount = await getProductsCount(searchValue);
  return (
    <div className={`app`}>
      <div style={{ position: 'relative' }}>
        <ThemeToggleButton />
        <Search />
        <Flyout />
        <div>
          <ListResult data={data} />
          <Pagination itemsCount={productsCount}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Layout;
