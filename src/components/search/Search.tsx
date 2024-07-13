import { FormEvent, useState } from 'react';
import './search.css';
import ErrorBtn from '../error-boundary/ErrorBtn';

const Search = (props: { updateData: (arg0: string) => void }) => {
  // const [value, setValue] = useState('');
  const [inputVal, setInputValue] = useState(
    localStorage.getItem('valueKey') || ''
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('valueKey', inputVal);
    if (props.updateData) {
      props.updateData(inputVal);
    }
  };

  const onChange = (event: { target: { value: string } }) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h2 className="header">Api: Star Wars (SWAPI)</h2>
      <div className="search__container">
        <form onSubmit={onSubmit}>
          <label className="search__label">
            Enter what you want to see:
            <input
              className="search__input"
              name="key"
              id="key"
              type="text"
              placeholder="enter search param"
              autoComplete="on"
              value={inputVal}
              onChange={onChange}
            />
          </label>
          <button className="search__btn" type="submit">
            Search
          </button>
        </form>
        <ErrorBtn />
      </div>
    </>
  );
};

export default Search;
