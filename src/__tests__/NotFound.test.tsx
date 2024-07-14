import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';

const wrongPath = '/kavabanga';

describe('Not Found', () => {
  it('It renders component', () => {
    render(
      <MemoryRouter>
        <NotFound />
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
        <MainPage />
      </MemoryRouter>
    );
    const notFoundText = screen.findByText(
      /Ooops!!! The page you are looking for is not found/i
    );
    expect(notFoundText).not.toBeNull();
  });
});
