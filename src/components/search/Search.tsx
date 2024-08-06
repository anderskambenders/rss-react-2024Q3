import { FormEvent, useState } from 'react';
import ErrorBtn from '../error-boundary/ErrorBtn';
import { useAppDispatch } from '../../store/hooks';
import { searchTermSlice } from '../../store/reducers/searchTerm.slice';

const Search = () => {
  const dispatch = useAppDispatch();
  const [inputVal, setInputValue] = useState(dispatch);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(searchTermSlice.actions.set(inputVal));
  };

  const onChange = (event: { target: { value: string } }) => {
    setInputValue(event.target.value);
  };
  return (
    <>
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
