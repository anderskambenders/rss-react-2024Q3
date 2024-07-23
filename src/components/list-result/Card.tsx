import { NavLink } from 'react-router-dom';

type CardProps = {
  id: number;
  image: string[];
  title: string;
  description: string;
  page: string | number;
};

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <input
        type="checkbox"
        onChange={() => {
          console.log('checked');
        }}
        className="card-checkbox"
        // disabled={isFetching} // Disable checkbox if details are being fetched
      />
      <NavLink
        className="link"
        data-testid="card"
        to={`about/${props.id}?page=${props.page}`}
      >
        <div className="list__item" key={props.id}>
          <ul className="item__container">
            <img
              className="item__img"
              src={props.image[0]}
              alt="product image"
            />
            <li className="item">{`Name: ${props.title}`}</li>
            <li className="item">{`Description: ${props.description} cm`}</li>
          </ul>
        </div>
      </NavLink>
    </div>
  );
};
export default Card;
