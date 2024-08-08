import Card from './Card';
import Pagination from '../pagination/Pagination';
import { IProduct } from '../../types/types';
import CardDetail from '../card/CardDetail';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';

export interface IData {
  cardsData: IProduct[];
  detailsData: IProduct | null;
  cardsCount: number;
}

const ListResult = ({ data }: { data: IData }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { details, ...queryWithoutDetails } = query;
  const theme = useTheme();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (details) {
          delete query.details;
          router.push({
            pathname,
            query: { ...queryWithoutDetails },
          });
        }
      }}
      className="result__container"
    >
      <div className="list__container">
        <div>
          <div className={`list list-${theme}`}>
            {data.cardsData.length === 0 && <p>Sorry, no items founded</p>}
            {data.cardsData?.map((item: IProduct, ind: number) => (
              <div key={ind}>
                <Card product={item} />
              </div>
            ))}
          </div>
        </div>
        <Pagination itemsCount={data.cardsCount} />
      </div>
      {details && <CardDetail data={data.detailsData as IProduct}></CardDetail>}
    </div>
  );
};
export default ListResult;
