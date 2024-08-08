import { useRouter } from 'next/router';
import { IProduct } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';

const CardDetail = ({ data }: { data: IProduct }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { details, ...queryWithoutDetails } = query;
  const { theme } = useTheme();

  return (
    <div className={'product__info'}>
      {data && details && (
        <div className={`info__wrap info__wrap-${theme}`}>
          <img className="product__img" src={data.images[0]} alt="prod-img" />
          <h3 className={'title'}>{data.title}</h3>
          <div className={'block__info'}>
            <div className="info__brand">Brand: {data.brand}</div>
            <div className="info__desc">Description: {data.description}</div>
            <div className="info__price">Price: {data.price}$</div>
            <div className={'list__wrap'}></div>
          </div>
          <div>
            <button
              className={'back__button'}
              onClick={(e) => {
                e.stopPropagation();
                router.push({
                  pathname,
                  query: { ...queryWithoutDetails },
                });
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
