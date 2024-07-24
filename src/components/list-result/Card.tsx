import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
import { IProduct } from '../../types/types';

type CardProps = {
  product: IProduct;
  page: string | number;
};

const Card = ({ product, page }: CardProps) => {
  const dispatch = useAppDispatch();
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
    <div className="card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onChange}
        className="card-checkbox"
      />
      <Link
        className="link"
        data-testid="card"
        to={`about/${product.id}?page=${page}`}
      >
        <div className="list__item" key={product.id}>
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
      </Link>
    </div>
  );
};
export default Card;
