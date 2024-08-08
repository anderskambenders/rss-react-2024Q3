import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../__tests__/mock/mockRouter';

const product = {
  id: 1,
  title: 'Iphone',
  description: 'Description: SIM-Free,',
  price: 1000,
  discountPercentage: 10,
  rating: 10,
  stock: 4,
  brand: 'apple',
  category: 'phones',
  thumbnail: ['moc, apple'],
  species: ['red', 'blue'],
  images: ['image.png'],
};

describe('Card Component', () => {
  it('image is rendered', () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <Card product={product} />
          </ThemeProvider>
        </Provider>
      </RouterContext.Provider>
    );
    expect(screen.getByAltText('product-image')).toBeInTheDocument();
  });
  it('renders the relevant card data', () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <Card product={product} />
          </ThemeProvider>
        </Provider>
      </RouterContext.Provider>
    );
    const name = screen.getByText('Name: Iphone');
    expect(name).toBeInTheDocument();
  });
});
