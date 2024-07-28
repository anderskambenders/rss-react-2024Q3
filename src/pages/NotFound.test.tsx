import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import NotFound from './NotFoundPage';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../__tests__/mock/mockStore';

const wrongPath = '/kavabanga';

describe('Not Found', () => {
  it('It renders component', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <NotFound />
        </ThemeProvider>
      </MemoryRouter>
    );
    const notFoundText = screen.findByText(
      /Ooops!!! The page you are looking for is not found/i
    );
    expect(notFoundText).toBeTruthy();
  });

  it('Redirects to NotFound for invalid path', () => {
    render(
      <MemoryRouter initialEntries={[wrongPath]}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    const notFoundText = screen.findByText(
      /Ooops!!! The page you are looking for is not found/i
    );
    expect(notFoundText).not.toBeNull();
  });
});
