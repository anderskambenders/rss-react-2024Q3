import Layout from './layout';
import { ThemeProvider } from '../../context/ThemeContext';

async function getProducts(searchValue: string = '', page: string = '1') {
  const limit = 10;
  const skip = (+limit * (+(page || 1) - 1)).toString() || '0';
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchValue}&limit=${limit}&skip=${skip}`,
    {
      method: 'GET',
    }
  );

  const products = await response.json();
  return products.products;
}

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { page, query } = searchParams;
  const data = await getProducts(query, page);
  console.log(data);
  return (
    <ThemeProvider>
      <Layout searchParams={searchParams} data={data} searchValue={query} />
    </ThemeProvider>
  );
};

export default Home;
