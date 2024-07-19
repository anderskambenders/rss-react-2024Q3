import { useEffect, useState } from 'react';
import { BASE_URL, SEARCH_URL } from '../../utils/api';
import './list-result.css';
import { IProduct } from '../../types/types';
import Pagination from '../pagination/Pagination';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import Card from './Card';
import { useAppSelector } from '../../store/hooks';

export const LIMIT = 10;

const ListResult = () => {
  const searchValue = useAppSelector((state) => state.searchTerm.searchTerm);
  const [search] = useSearchParams();
  const page = search.get('page') || 1;
  const skip = LIMIT * (+page - 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Array<IProduct>>([]);
  const [itemsCount, setItemsCount] = useState(0);

  console.log(searchValue);

  const getData = async (url: string) => {
    setIsLoaded(false);
    setItems([]);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setItemsCount(result.total);
      setIsLoaded(true);
      setItems(result.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const url =
      searchValue !== '' ? SEARCH_URL(searchValue) : BASE_URL(LIMIT, skip);
    getData(url as string);
  }, [searchValue]);

  return (
    <div className="result__container">
      <div className="list__container">
        <div>
          {!isLoaded && <p>Loading...</p>}
          <div className="list">
            {isLoaded && items.length === 0 && <p>Sorry, no items founded</p>}
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
        {isLoaded && <Pagination itemsCount={itemsCount} />}
      </div>
      <Outlet />
    </div>
  );
};

export default ListResult;
