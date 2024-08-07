// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
// import { IProduct } from '../../types/types';
// import { useTheme } from '../../context/ThemeContext';
// import './card.css';

// type CardProps = {
//   product: IProduct;
//   page: string | number;
// };

// const Card = ({ product, page }: CardProps) => {
//   const { theme } = useTheme();
//   const dispatch = useAppDispatch();
//   const selectedItems = useAppSelector(
//     (state) => state.selectedItems.selectedItems
//   );
//   const isSelected = selectedItems.some((item) => item.id === product.id);
//   const onChange = () => {
//     if (isSelected) {
//       dispatch(selectedItemsSlice.actions.unselectItem(product));
//     } else {
//       dispatch(selectedItemsSlice.actions.selectItem(product));
//     }
//   };

//   return (
//     <div className="card">
//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={onChange}
//         className="card-checkbox"
//       />
//       <Link
//         className="link"
//         data-testid="card"
//         to={`about/${product.id}?page=${page}`}
//       >
//         <div className={`list__item list__item-${theme}`} key={product.id}>
//           <ul className="item__container">
//             <img
//               className="item__img"
//               src={product.images[0]}
//               alt="product image"
//             />
//             <li className="item card__header">{`${product.title}`}</li>
//             <li className="item card__text">{`${product.description} cm`}</li>
//           </ul>
//         </div>
//       </Link>
//     </div>
//   );
// };
// export default Card;

import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IProduct } from '../../types/types';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
import { useRouter } from 'next/router';

const Card = ({ product }: { product: IProduct }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname, query } = router;
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems
  );
  const isSelected = selectedItems.some((item) => item.id === product.id);
  const onChange = () => {
    if (isSelected) {
      dispatch(selectedItemsSlice.actions.unselectItem(product));
    } else {
      dispatch(selectedItemsSlice.actions.selectItem(product));
    }
  };

  return (
    <div
      onClick={() => {
        router.push({
          pathname,
          query: { ...query, details: `${product.id}` },
        });
      }}
      data-testid="card"
      className="card"
      key={product.id}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onChange}
          className="card-checkbox"
        />
      </div>
      <div className={`list__item list__item-${theme}`}>
        <ul className="item__container">
          <img
            className="item__img"
            src={product.images[0]}
            alt="product image"
          />
          <li className="item">{`Name: ${product.title}`}</li>
          <li className="item">{`Description: ${product.description} cm`}</li>
        </ul>
      </div>
    </div>
  );
};
export default Card;
