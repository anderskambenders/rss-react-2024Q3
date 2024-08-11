import { act, render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import ListResult from './ListResult';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

export const data = {
  cardsData: [
    {
      id: 1,
      title: 'Iphone',
      description: 'Iphone 8',
      price: 1000,
      discountPercentage: 10,
      rating: 10,
      stock: 4,
      brand: 'apple',
      category: 'phones',
      thumbnail: ['moc, apple'],
      species: ['red', 'blue'],
      images: ['image.png'],
    },
    {
      id: 2,
      title: 'Iphone',
      description: 'Iphone 10',
      price: 1000,
      discountPercentage: 10,
      rating: 10,
      stock: 4,
      brand: 'apple',
      category: 'phones',
      thumbnail: ['moc, apple'],
      species: ['red', 'blue'],
      images: ['image.png'],
    },
    {
      id: 3,
      title: 'Iphone',
      description: 'Iphone 12',
      price: 1000,
      discountPercentage: 10,
      rating: 10,
      stock: 4,
      brand: 'apple',
      category: 'phones',
      thumbnail: ['moc, apple'],
      species: ['red', 'blue'],
      images: ['image.png'],
    },
  ],
  detailsData: null,
  cardsCount: 3,
};

describe('CardContainer', () => {
  it('renders component', async () => {
    const container = await act(async () => {
      return render(
        <Provider store={mockStore}>
          <ThemeProvider>
            <ListResult data={data.cardsData} />
          </ThemeProvider>
        </Provider>
      );
    });
    expect(container).toBeTruthy();
  });

  it('renders the specified number of cards', async () => {
    const container = await act(async () => {
      return render(
        <Provider store={mockStore}>
          <ThemeProvider>
            <ListResult data={data.cardsData} />
          </ThemeProvider>
        </Provider>
      ).container;
    });
    expect(container.getElementsByClassName('list__item').length).toBe(
      data.cardsData.length
    );
  });

  it('displays message if no cards are present', async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <ThemeProvider>
            <ListResult data={[]} />
          </ThemeProvider>
        </Provider>
      );
    });
    expect(screen.getByText('Sorry, no items founded')).toBeInTheDocument();
  });
});
