import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader Component', () => {
  it('should render the loading indicator', () => {
    render(<Loader />);

    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('loading-wrap');
  });

  it('should contain the loading structure', () => {
    render(<Loader />);

    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement.querySelector('.loading')).toBeInTheDocument();
    expect(loadingElement.querySelector('.ring')).toBeInTheDocument();
    expect(loadingElement.querySelector('.ball-holder')).toBeInTheDocument();
    expect(loadingElement.querySelector('.ball')).toBeInTheDocument();
  });
});
