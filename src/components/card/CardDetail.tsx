import { Link, useParams, useSearchParams } from 'react-router-dom';
import { productsApi } from '../../service/ProductsService';
import './card-detail.css';

const CardDetail = () => {
  const { productId } = useParams();
  const { data, isFetching } = productsApi.useGetProductQuery(productId);
  const [search] = useSearchParams();
  const currentPage = search.get('page');
  const url = `/?page=${currentPage}`;

  return (
    <div className={'characterInfo'}>
      {data && (
        <div className={'infoWrap'}>
          <img className="product__img" src={data.images[0]} alt="prod-img" />
          <h3 className={'title'}>{data.title}</h3>
          <div className={'blockInfo'}>
            <div>Brand: {data.brand}</div>
            <div>Description: {data.description}</div>
            <div>Price: {data.price}$</div>
            <div className={'listWrap'}></div>
          </div>
          <div>
            <Link to={url}>
              <button className={'backButton'}>Back</button>
            </Link>
          </div>
        </div>
      )}
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default CardDetail;
