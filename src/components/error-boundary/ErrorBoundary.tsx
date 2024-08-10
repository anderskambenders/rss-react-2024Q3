'use client';
import { Component, ErrorInfo } from 'react';

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<{ children?: JSX.Element }, State> {
  constructor(props: { children?: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
