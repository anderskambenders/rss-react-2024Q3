import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

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

describe('Pagination', () => {
  it('renders component', () => {
    render(<Pagination itemsCount={100} />);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
  it('should render pagination buttons', () => {
    render(<Pagination itemsCount={50} />);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
});
