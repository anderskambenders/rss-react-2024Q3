import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListResult from '../components/list-result/ListResult';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('CardContainer', () => {
  it('It renders component', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <ListResult data={''} />
      </MemoryRouter>
    );
    expect(ListResult).toBeTruthy();
  });
  it('renders the specified number of cards', async () => {
    render(<App />);
    const content = await screen.findAllByTestId('card');
    expect(content.length).toBe(10);
  });
  it('message is displayed if no cards are present', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <ListResult data={''} />
      </MemoryRouter>
    );
    const notFoundText = screen.findByText('Sorry, no items founded');
    expect(notFoundText).toBeTruthy();
  });
});
