import { useState } from 'react';
import Search from '../components/search/Search';
import ListResult from '../components/list-result/ListResult';

const MainPage = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('valueKey') || ''
  );
  const updateData = (value: string) => {
    setSearchValue(value);
  };
  return (
    <>
      <Search updateData={updateData} />
      <ListResult data={searchValue} />
    </>
  );
};

export default MainPage;
