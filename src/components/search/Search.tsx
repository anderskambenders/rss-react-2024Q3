import { Component } from 'react';
import './search.css';

interface SearchProps {
  children?: JSX.Element;
  updateData?: (value: string) => void;
}
type State = {
  value: string;
};

class Search extends Component<SearchProps, State> {
  inputVal: string;
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
    this.inputVal = '';
  }

  render() {
    return (
      <>
        <h2 className="header">Api: Star Wars (SWAPI)</h2>
        <div className="search__container">
          <form>
            <label className="search__label">
              Enter what you want to see:
              <input
                className="search__input"
                name="key"
                id="key"
                type="text"
                placeholder="enter search param"
                autoComplete="on"
                value={this.state.value}
              />
            </label>
            <button className="search__btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
