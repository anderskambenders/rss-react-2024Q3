import './card-detail.css';
import { IProduct } from '../../types/types';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../utils/api';
import { useEffect, useState } from 'react';

const CardDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (productId) {
        const prod = await getProduct(+productId);
        setProduct(prod);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const CardInfo = product && (
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
      {loading && <p>Loading...</p>}
      {!loading && CardInfo}
    </div>
  );
};

export default CardDetail;
