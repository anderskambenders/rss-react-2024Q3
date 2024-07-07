import { Component } from 'react';
import Search from '../components/search/Search';
import ListResult from '../components/list-result/ListResult';

export default class MainPage extends Component {
  render() {
    return (
      <>
        <Search />
        <ListResult />
      </>
    );
  }
}
