import { Link, useParams, useSearchParams } from 'react-router-dom';
import { productsApi } from '../../service/ProductsService';
import './card-detail.css';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../loader/Loader';

const CardDetail = () => {
  const { theme } = useTheme();
  const { productId } = useParams();
  const { data, isFetching } = productsApi.useGetProductQuery(productId);
  const [search] = useSearchParams();
  const currentPage = search.get('page');
  const url = `/?page=${currentPage}`;

  return (
    <div className={'product__info'}>
      {data && (
        <div className={`info__wrap info__wrap-${theme}`}>
          <img className="product__img" src={data.images[0]} alt="prod-img" />
          <h3 className={'title'}>{data.title}</h3>
          <div className={'block__info'}>
            <div>Brand: {data.brand}</div>
            <div>Description: {data.description}</div>
            <div>Price: {data.price}$</div>
            <div className={'list__wrap'}></div>
          </div>
          <div>
            <Link to={url}>
              <button className={'back__button'}>Back</button>
            </Link>
          </div>
        </div>
      )}
      {isFetching && <Loader />}
    </div>
  );
};

export default CardDetail;
