import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListResult from './ListResult';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';

describe('CardContainer', () => {
  it('It renders component', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <ListResult />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(ListResult).toBeTruthy();
  });
  it('renders the specified number of cards', async () => {
    render(<App />);
    const content = await screen.findAllByTestId('card');
    expect(content.length).toBe(10);
  });
  it('It renders component', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <ListResult />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    const notFoundText = screen.findByText('Sorry, no items founded');
    expect(notFoundText).toBeTruthy();
  });
});
