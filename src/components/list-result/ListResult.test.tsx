import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListResult from './ListResult';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';

const testComponent = (
  <MemoryRouter initialEntries={['/page/1/']}>
    <Provider store={mockStore}>
      <ThemeProvider>
        <ListResult />
      </ThemeProvider>
    </Provider>
  </MemoryRouter>
);

describe('CardContainer', () => {
  it('It renders component', async () => {
    render(testComponent);
    expect(ListResult).toBeTruthy();
  });
  it('renders the specified number of cards', async () => {
    render(<App />);
    const content = await screen.findAllByTestId('card');
    expect(content.length).toBe(10);
  });
  it('It renders component', async () => {
    const noItemsString = 'Sorry, no items founded';
    render(testComponent);
    const notFoundText = screen.findByText(noItemsString);
    expect(notFoundText).toBeTruthy();
  });
});
