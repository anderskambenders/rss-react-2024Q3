import { useEffect, useState } from 'react';
import { baseUrl, searchUrl } from '../../utils/api';
import './list-result.css';
import { Product } from './types';
import Pagination from '../pagination/Pagination';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import Card from './Card';

export const LIMIT = 10;

const ListResult = (props: { data: string }) => {
  const storageData = localStorage.getItem('valueKey');
  const [search] = useSearchParams();
  const page = Object.fromEntries(search).page || '1';
  const skip = LIMIT * (+page - 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Array<Product>>([]);
  const [itemsCount, setItemsCount] = useState(0);

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
    let url;
    if (props.data?.length === 0) {
      url = baseUrl(LIMIT, skip);
    } else {
      url = storageData !== null ? searchUrl(storageData) : baseUrl;
    }
    getData(url as string);
  }, [page, props.data]);
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
