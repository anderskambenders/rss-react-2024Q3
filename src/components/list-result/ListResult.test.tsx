import { act, render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import ListResult from './ListResult';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../__tests__/mock/mockRouter';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';
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
  it('It renders component', async () => {
    const container = await act(async () => {
      const mockRouter = createMockRouter({});
      return render(
        <Provider store={mockStore}>
          <RouterContext.Provider value={mockRouter}>
            <ThemeProvider>
              <ListResult data={data} />
            </ThemeProvider>
          </RouterContext.Provider>
        </Provider>
      );
    });
    expect(container).toBeTruthy();
  });

  it('renders the specified number of cards', async () => {
    const container = await act(async () => {
      const mockRouter = createMockRouter({});
      return render(
        <Provider store={mockStore}>
          <RouterContext.Provider value={mockRouter}>
            <ThemeProvider>
              <ListResult data={data} />
            </ThemeProvider>
          </RouterContext.Provider>
        </Provider>
      ).container;
    });
    expect(container.getElementsByClassName('list__item').length).toBe(
      data.cardsData.length
    );
  });

  it('message is displayed if no cards are present', () => {
    act(() => {
      const mockRouter = createMockRouter({});
      render(
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <ListResult
              data={{ cardsData: [], cardsCount: 0, detailsData: null }}
            />
          </ThemeProvider>
        </RouterContext.Provider>
      );
    });
    expect(screen.getByText('Sorry, no items founded')).toBeInTheDocument();
  });
});
