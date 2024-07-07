import { Component } from 'react';
import { Character } from './types';
import './list-result.css';

type State = {
  isLoaded: boolean;
  items: Array<Character>;
};

interface ResultProps {
  children?: JSX.Element;
  data?: string;
}

class ListResult extends Component<ResultProps, State> {
  baseUrl: string;
  searchUrl: string;
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
    };
    this.baseUrl = `https://swapi.dev/api/people/`;
    this.searchUrl = `https://swapi.dev/api/people/?search=`;
  }

  async getData(url: string) {
    this.setState({ isLoaded: false, items: [] });
    const response = await fetch(url);
    const result = await response.json();
    this.setState({
      isLoaded: true,
      items: result.results,
    });
  }

  componentDidMount() {
    const url =
      localStorage.getItem('valueKey') !== null
        ? `${this.searchUrl}${localStorage.getItem('valueKey')}`
        : this.baseUrl;
    this.getData(url);
  }

  componentDidUpdate(prevProps: { data: string | undefined }): void {
    if (this.props.data !== prevProps.data) {
      const url =
        this.props.data?.length !== 0
          ? `${this.searchUrl}${this.props.data}`
          : this.baseUrl;
      this.getData(url);
    }
  }

  render() {
    return (
      <div className="list__container">
        {!this.state.isLoaded && <p>Loading...</p>}
        <ol className="list">
          {this.state.isLoaded && this.state.items.length === 0 && (
            <p>Sorry, no items founded</p>
          )}
          {this.state.items.map((item) => (
            <li className="list__item" key={item.name}>
              <ul className="item__container">
                <li className="item">{`Name: ${item.name}`}</li>
                <li className="item">{`Gender: ${item.gender} cm`}</li>
                <li className="item">{`Eye color: ${item.eye_color}`}</li>
                <li className="item">{`Birth year: ${item.birth_year}`}</li>
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListResult;
