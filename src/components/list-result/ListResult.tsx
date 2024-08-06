// import { useEffect, useState } from 'react';
// import './list-result.css';
// import { IProduct } from '../../types/types';
// import Pagination from '../pagination/Pagination';
// import Card from './Card';
// import { productsApi } from '../../service/ProductsService';
// import { useAppSelector } from '../../store/hooks';
// import { useTheme } from '../../context/ThemeContext';
// import Loader from '../loader/Loader';

// export const LIMIT = 10;

// const ListResult = () => {
//   const { theme } = useTheme();
//   const searchValue = useAppSelector((state) => state.searchTerm.searchTerm);
//   const skip = LIMIT * (+page - 1);
//   const [items, setItems] = useState<Array<IProduct>>([]);
//   const [itemsCount, setItemsCount] = useState(0);
//   const { data, isFetching } = productsApi.useGetProductsQuery({
//     searchValue,
//     limit: LIMIT,
//     skip,
//   });

//   useEffect(() => {
//     setSearchParams({ ...searchParams, page: '1' });
//   }, [searchValue]);

//   useEffect(() => {
//     isFetching
//       ? setItems([])
//       : (setItems(data?.products), setItemsCount(data?.total));
//   }, [searchValue, data, isFetching]);

//   return (
//     <div className="result__container">
//       <div className="list__container">
//         <div>
//           {isFetching && <Loader />}
//           <div className={`list list-${theme}`}>
//             {!isFetching && items.length === 0 && (
//               <p>Sorry, no items founded</p>
//             )}
//             {items &&
//               items.map((item, ind) => (
//                 <Card product={item} key={`card${ind}`} page={page} />
//               ))}
//           </div>
//         </div>
//         {!isFetching && <Pagination itemsCount={itemsCount} />}
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default ListResult;

import Card from './Card';
import Pagination from '../pagination/Pagination';
import { IProduct } from '../../types/types';
import CardDetail from '../card/CardDetail';
import { useRouter } from 'next/router';

export interface IData {
  cardsData: IProduct[];
  detailsData: IProduct | null;
  cardsCount: number;
}

const ListResult = ({ data }: { data: IData }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { details, ...queryWithoutDetails } = query;

  return (
    <div
      onClick={() => {
        if (details) {
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
          <div className="list">
            {data.cardsData.length === 0 && <p>Sorry, no items founded</p>}
            {data.cardsData?.map((item: IProduct, ind: number) => (
              <div
                key={ind}
                onClick={() => {
                  router.push({
                    pathname,
                    query: { ...query, details: `${item.id}` },
                  });
                }}
              >
                <Card
                  id={item.id}
                  image={item.images}
                  title={item.title}
                  description={item.description}
                />
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
