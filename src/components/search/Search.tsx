import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ErrorBtn from '../error-boundary/ErrorBtn';
import { useRouter } from 'next/router';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  useEffect(() => {
    setSearchValue((router.query.searchValue || '').toString());
    const pageParam = router.query?.page;
    if (!pageParam) {
      router.push({ query: { ...router.query, page: 1 } });
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('valueKey', searchValue);
    router.push({ query: { page: 1, searchValue } });
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
