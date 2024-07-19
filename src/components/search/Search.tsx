import { FormEvent, useState } from 'react';
import './search.css';
import ErrorBtn from '../error-boundary/ErrorBtn';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchTermSlice } from '../../store/reducers/searchTerm.slice';
import useLocaleStorage from '../../hooks/useLocaleStorage';

const Search = () => {
  const [, setLSTerm] = useLocaleStorage('valueKey', '');
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);
  const [inputVal, setInputValue] = useState(searchTerm);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(searchTermSlice.actions.set(inputVal));
    setLSTerm(inputVal);
  };

  const onChange = (event: { target: { value: string } }) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h2 className="header">
        Api: DummyJSON (
        <a target="blank" href="https://dummyjson.com/">
          https://dummyjson.com/
        </a>
        )
      </h2>
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
