import { NavLink } from 'react-router-dom';
import './not-found.css';

const NotFoundPage = () => {
  return (
    <div className="section">
      <h1 className="error">404</h1>
      <div className="page">
        Ooops!!! The page you are looking for is not found
      </div>
      <NavLink to={'/'} className="back-home">
        Back to home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
