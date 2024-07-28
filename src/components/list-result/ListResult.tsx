import { useEffect, useState } from 'react';
import './list-result.css';
import { IProduct } from '../../types/types';
import Pagination from '../pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import Card from './Card';
import { productsApi } from '../../service/ProductsService';
import { useAppSelector } from '../../store/hooks';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../loader/Loader';

export const LIMIT = 10;

const ListResult = () => {
  const { theme } = useTheme();
  const searchValue = useAppSelector((state) => state.searchTerm.searchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const skip = LIMIT * (+page - 1);
  const [items, setItems] = useState<Array<IProduct>>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const { data, isFetching } = productsApi.useGetProductsQuery({
    searchValue,
    limit: LIMIT,
    skip,
  });

  useEffect(() => {
    setSearchParams({ ...searchParams, page: '1' });
  }, [searchValue]);

  useEffect(() => {
    isFetching
      ? setItems([])
      : (setItems(data?.products), setItemsCount(data?.total));
  }, [searchValue, data, isFetching]);

  return (
    <div className="result__container">
      <div className="list__container">
        <div>
          {isFetching && <Loader />}
          <div className={`list list-${theme}`}>
            {!isFetching && items.length === 0 && (
              <p>Sorry, no items founded</p>
            )}
            {items &&
              items.map((item, ind) => (
                <Card product={item} key={`card${ind}`} page={page} />
              ))}
          </div>
        </div>
        {!isFetching && <Pagination itemsCount={itemsCount} />}
      </div>
      <Outlet />
    </div>
  );
};

export default ListResult;
