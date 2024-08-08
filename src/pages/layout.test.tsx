import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { IData } from '../components/list-result/ListResult';
import Layout from './layout';

vi.mock('../components/flyout/Flyout', () => ({
  default: () => <div data-testid="flyout">Flyout Component</div>,
}));

vi.mock('../components/list-result/ListResult', () => ({
  default: ({ data }: { data: IData }) => (
    <div data-testid="list-result">
      List Result Component - Cards: {data.cardsCount}
    </div>
  ),
}));

vi.mock('../components/search/Search', () => ({
  default: () => <div data-testid="search">Search Component</div>,
}));

vi.mock('../components/theme-toggler/ThemeToggler', () => ({
  default: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}));

const mockData: IData = {
  cardsData: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100,
      discountPercentage: 10,
      rating: 4.5,
      stock: 50,
      brand: 'Brand A',
      category: 'Category 1',
      thumbnail: ['thumb1.jpg'],
      species: ['Species A'],
      images: ['image1.jpg'],
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 200,
      discountPercentage: 15,
      rating: 4.7,
      stock: 30,
      brand: 'Brand B',
      category: 'Category 2',
      thumbnail: ['thumb2.jpg'],
      species: ['Species B'],
      images: ['image2.jpg'],
    },
  ],
  detailsData: null,
  cardsCount: 2,
};

describe('Layout Component', () => {
  it('renders correctly with given data and theme', () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: vi.fn() }}>
        <Layout data={mockData} />
      </ThemeContext.Provider>
    );

    expect(getByTestId('theme-toggle')).toBeInTheDocument();
    expect(getByTestId('search')).toBeInTheDocument();
    expect(getByTestId('flyout')).toBeInTheDocument();
    expect(getByTestId('list-result')).toBeInTheDocument();
    expect(getByTestId('list-result').textContent).toContain('Cards: 2');
  });

  it('applies the correct theme to the layout', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: vi.fn() }}>
        <Layout data={mockData} />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('app-dark');
  });
});
