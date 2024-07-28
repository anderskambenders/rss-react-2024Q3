import './loader.css';

const Loader = () => {
  return (
    <div data-testid="loader" className="loading-wrap">
      <div className="loading">
        <div className="ring">
          <div className="ball-holder">
            <div className="ball"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
