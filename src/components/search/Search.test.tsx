import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../__tests__/mock/mockStore';
import { Provider } from 'react-redux';

const TEST_STRING = 'Cawabanga';
const SEARCH_DEFAULT: string = 'valueKey';
const SEARCH_PLACEHOLDER_TEXT = 'enter search param';

const MockSearchComponent = () => {
  return (
    <Provider store={mockStore}>
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    </Provider>
  );
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

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem(SEARCH_DEFAULT, TEST_STRING);
    render(<MockSearchComponent />);

    const inputElement = (await screen.findByPlaceholderText(
      SEARCH_PLACEHOLDER_TEXT
    )) as HTMLInputElement;
    expect(inputElement.value).toEqual(TEST_STRING);
  });
});
