import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Card from './Card';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn((key) => {
      if (key === 'page') return '1';
      return null;
    }),
    set: vi.fn(),
  }),
}));

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
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card product={product} />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByAltText('product-image')).toBeInTheDocument();
  });
  it('renders the relevant card data', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card product={product} />
        </ThemeProvider>
      </Provider>
    );
    const name = screen.getByText('Name: Iphone');
    expect(name).toBeInTheDocument();
  });
});
