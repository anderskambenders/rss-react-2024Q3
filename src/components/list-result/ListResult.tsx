import { useEffect, useState } from 'react';
import { BASE_URL, SEARCH_URL, getData } from '../../utils/api';
import './list-result.css';
import { Product } from './types';

const ListResult = (props: { data: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Array<Product>>([]);

  useEffect(() => {
    const url =
      localStorage.getItem('valueKey') !== null
        ? `${SEARCH_URL}${localStorage.getItem('valueKey')}`
        : BASE_URL;
    const getDataList = async () => {
      setIsLoaded(false);
      setItems([]);
      const items = await getData(url);
      setItems(items);
      setIsLoaded(true);
    };
    getDataList();
  }, [props.data]);
  return (
    <div className="list__container">
      {!isLoaded && <p>Loading...</p>}
      <ol className="list">
        {isLoaded && items.length === 0 && <p>Sorry, no items founded</p>}
        {items.map((item, ind) => (
          <div key={`$item-list${ind}`}>
            <div className="list__item" key={item.id}>
              <ul className="item__container">
                <img className="item__img" src={item.images[0]} />
                <li className="item">{`Name: ${item.title}`}</li>
                <li className="item">{`Description: ${item.description} cm`}</li>
              </ul>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default ListResult;
