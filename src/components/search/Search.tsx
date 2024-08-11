'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ErrorBtn from '../error-boundary/ErrorBtn';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();
  const details = searchParams && searchParams.get('details');
  const router = useRouter();
  useEffect(() => {
    const newQuery = new URLSearchParams({
      page: '1',
      query: searchValue,
      ...(details && { details }),
    }).toString();

    router.push(`?${newQuery}`);
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('valueKey', searchValue);
    const newQuery = new URLSearchParams({
      page: '1',
      query: searchValue,
      ...(details && { details }),
    }).toString();
    router.push(`?${newQuery}`);
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
              value={searchValue}
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
