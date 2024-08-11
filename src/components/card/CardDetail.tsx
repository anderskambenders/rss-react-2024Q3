import BackButton from './BackButton';

const getProduct = async (id: string) => {
  if (!id) throw new Error('Product ID is required');
  const productResponse = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'GET',
  });
  const product = await productResponse.json();
  return product;
};

const CardDetail = async ({ id }: { id: string }) => {
  const data = await getProduct(id);

  return (
    <div data-testid="product__info" className={'product__info'}>
      {data && (
        <div className={`info__wrap info__wrap-$`}>
          {data.images?.length > 0 && (
            <img className="product__img" src={data.images[0]} alt="prod-img" />
          )}
          <h3 className={'title'}>{data.title}</h3>
          <div className={'block__info'}>
            <div className="info__brand">Brand: {data.brand}</div>
            <div className="info__desc">Description: {data.description}</div>
            <div className="info__price">Price: {data.price}$</div>
            <div className={'list__wrap'}></div>
          </div>
          <div>
            <BackButton></BackButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
