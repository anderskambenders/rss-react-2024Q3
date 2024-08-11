import { act, fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

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

const TEST_STRING = 'Cawabanga';
const SEARCH_DEFAULT: string = 'valueKey';
const SEARCH_PLACEHOLDER_TEXT = 'enter search param';

const MockSearchComponent = () => {
  return <Search />;
};

describe('Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<MockSearchComponent />);

    localStorage.setItem(SEARCH_DEFAULT, '');

    const inputElement = await screen.findByPlaceholderText(
      SEARCH_PLACEHOLDER_TEXT
    );

    fireEvent.change(inputElement, { target: { value: TEST_STRING } });
    const buttonElement = await screen.findByRole('button', {
      name: /search/i,
    });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem(SEARCH_DEFAULT)).toEqual(TEST_STRING);
  });
  it('clicking the Search button should set search parameters', async () => {
    act(() => {
      render(<Search />);
    });
    const inputElement = await screen.findByPlaceholderText(
      SEARCH_PLACEHOLDER_TEXT
    );

    await act(async () => {
      await userEvent.type(inputElement, 'test query string');
      await userEvent.click(screen.getByText('Search'));
    });
  });
});
