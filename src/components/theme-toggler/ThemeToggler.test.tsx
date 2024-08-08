import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeToggleButton from '../../components/theme-toggler/ThemeToggler';
import { ThemeProvider } from '../../context/ThemeContext';

describe('ThemeToggleButton Component', () => {
  it('should render correctly with the light theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );

    expect(screen.getByText(/Switch to dark theme/i)).toBeInTheDocument();
  });
});
