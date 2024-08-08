import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../__tests__/mock/mockRouter';
import userEvent from '@testing-library/user-event';

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
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination itemsCount={100} />;
      </RouterContext.Provider>
    );
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
  it('updates URL query parameter when page changes', async () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination itemsCount={100} />;
      </RouterContext.Provider>
    );

    const nextPage = screen.getByText('>');
    expect(nextPage).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(nextPage);
    });
    expect(mockRouter.push).toBeCalledWith({
      query: { page: '2' },
    });
  });
});
