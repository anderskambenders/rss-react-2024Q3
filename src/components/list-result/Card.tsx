'use client';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IProduct } from '../../types/types';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
import { useRouter, useSearchParams } from 'next/navigation';

const Card = ({ product }: { product: IProduct }) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  // const page = +searchParams.get('page') || 1;
  // const details = searchParams.get('details');
  // const query = searchParams.get('query');
  const dispatch = useAppDispatch();
  const router = useRouter();
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
        const params = new URLSearchParams(searchParams?.toString());
        params.set('details', product.id.toString());
        router.replace(`?${params.toString()}`);
        console.log(params.toString());
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
            alt="product-image"
          />
          <li className="item">{`Name: ${product.title}`}</li>
          <li className="item">{`Description: ${product.description} cm`}</li>
        </ul>
      </div>
    </div>
  );
};
export default Card;
