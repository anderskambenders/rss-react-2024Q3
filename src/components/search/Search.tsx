import { Component, FormEvent } from 'react';
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

  onChange(event: { target: { value: string } }) {
    this.setState({ value: event.target.value });
    this.inputVal = event.target.value;
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('valueKey', this.inputVal);
    if (this.props.updateData) {
      this.props.updateData(this.inputVal);
    }
  };

  componentDidMount(): void {
    if (localStorage.getItem('valueKey') !== null) {
      this.setState({ value: localStorage.getItem('valueKey') as string });
    }
  }

  render() {
    return (
      <>
        <h2 className="header">Api: Star Wars (SWAPI)</h2>
        <div className="search__container">
          <form onSubmit={this.onSubmit.bind(this)}>
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
                onChange={this.onChange.bind(this)}
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
