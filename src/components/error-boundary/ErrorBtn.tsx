import { useState } from 'react';

const ErrorBtn = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };

  if (isClicked) {
    throw new Error('this is Error');
  }

  return (
    <button className="search__btn" onClick={handleClick}>
      Error button
    </button>
  );
};

export default ErrorBtn;
