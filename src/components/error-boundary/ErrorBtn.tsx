import { Component } from 'react';

type State = {
  IsClicked: boolean;
};

export default class ErrorBtn extends Component<
  { children?: JSX.Element },
  State
> {
  constructor(props: { children?: JSX.Element }) {
    super(props);
    this.state = {
      IsClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ IsClicked: true });
  }

  render() {
    if (this.state.IsClicked) {
      throw new Error('This is error');
    }
    return (
      <button className="search__btn" onClick={this.handleClick}>
        Error button
      </button>
    );
  }
}
