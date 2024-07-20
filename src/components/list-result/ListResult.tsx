import { useEffect, useState } from 'react';
import './list-result.css';
import { IProduct } from '../../types/types';
import Pagination from '../pagination/Pagination';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import Card from './Card';
import { productsApi } from '../../service/ProductsService';
import { useAppSelector } from '../../store/hooks';

export const LIMIT = 10;

const ListResult = () => {
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
          {isFetching && <p>Loading...</p>}
          <div className="list">
            {!isFetching && items.length === 0 && (
              <p>Sorry, no items founded</p>
            )}
            {items.map((item, ind) => (
              <Link
                className="link"
                data-testid="card"
                key={+page * 10 + ind}
                to={`about/${item.id}?page=${page}`}
              >
                <Card
                  id={item.id}
                  image={item.images}
                  title={item.title}
                  description={item.description}
                />
              </Link>
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
