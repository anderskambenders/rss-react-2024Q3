import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../components/pagination/Pagination';

const setSearch = vi.fn();
const searchParams = new Map([['page', '1']]);
const mockUseLocationValue = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
};
vi.mock('react-router-dom', () => ({
  useLocation: () => mockUseLocationValue,
  useParams: () => ({ id: 1 }),
  useSearchParams: () => [searchParams, setSearch],
  useEffect: () => [searchParams],
}));

describe('Pagination', () => {
  it('render component', () => {
    render(<Pagination itemsCount={100} />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
  it('updates URL query parameter when page changes', () => {
    render(<Pagination itemsCount={100} />);
    const nextPage = screen.getByText('2');
    fireEvent.click(nextPage);
    expect(setSearch).toBeCalled();
  });
});
