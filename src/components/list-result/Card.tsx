import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
import { IProduct } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';
import './card.css';

type CardProps = {
  product: IProduct;
  page: string | number;
};

const Card = ({ product, page }: CardProps) => {
  const { theme } = useTheme();
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
        <div className={`list__item list__item-${theme}`} key={product.id}>
          <ul className="item__container">
            <img
              className="item__img"
              src={product.images[0]}
              alt="product image"
            />
            <li className="item card__header">{`${product.title}`}</li>
            <li className="item card__text">{`${product.description} cm`}</li>
          </ul>
        </div>
      </Link>
    </div>
  );
};
export default Card;
