import './card.css';
import { Product } from '.././list-result/types';
import { useLoaderData, Link, LoaderFunction, defer } from 'react-router-dom';
import { getProduct } from '../../utils/api';

interface ProductData {
  product: Product;
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params && params.productId !== undefined) {
    return defer({ product: await getProduct(+params.productId) });
  }
};

const CardDetail = () => {
  const { product } = useLoaderData() as ProductData;
  console.log('card');
  const CardInfo = (
    <div className={'infoWrap'}>
      <img className="product__img" src={product.images[0]} alt="prod-img" />
      <h3 className={'title'}>{product.title}</h3>
      <div className={'blockInfo'}>
        <div>Brand: {product.brand}</div>
        <div>Description: {product.description}</div>
        <div>Price: {product.price}$</div>
        <div className={'listWrap'}></div>
      </div>
      <div>
        <Link to={'/'}>
          <button className={'backButton'}>Back</button>
        </Link>
      </div>
    </div>
  );
  return (
    <div className={'characterInfo'}>
      {product !== undefined ? CardInfo : <p>Loading...</p>}
    </div>
  );
};

export default CardDetail;
