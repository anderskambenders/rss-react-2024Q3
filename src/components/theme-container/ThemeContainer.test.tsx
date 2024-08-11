import { render, screen } from '@testing-library/react';
import ThemeContainer from './ThemeContainer';
import { ThemeProvider } from '../../context/ThemeContext';

describe('ThemeContainer component', () => {
  it('should render children with the correct theme class', () => {
    render(
      <ThemeProvider>
        <ThemeContainer>
          <div>Test Child</div>
        </ThemeContainer>
      </ThemeProvider>
    );

    const container = screen.getByText('Test Child').parentElement;
    expect(container).toHaveClass('app-light');
    expect(container).toBeInTheDocument();
  });
});
