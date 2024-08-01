import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';
import { MemoryRouter } from 'react-router-dom';
import { productMock } from '../../__tests__/mock/mockStore';

const TestElement = (
  <MemoryRouter>
    <ThemeProvider>
      <Provider store={mockStore}>
        <Card product={productMock} page={1} />
      </Provider>
    </ThemeProvider>
  </MemoryRouter>
);

describe('Card Component', () => {
  it('image is rendered', () => {
    render(TestElement);
    expect(screen.getByAltText('product image')).toBeInTheDocument();
  });
  it('renders the relevant card data', () => {
    render(TestElement);
    const name = screen.getByText(productMock.title);
    expect(name).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const titleSearch = 'Essence Mascara Lash Princess';
    localStorage.setItem('valueKey', productMock.title);
    render(<App />);

    const name = await screen.findByText(titleSearch);
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(titleSearch);
    expect(descriptionElement).not.toBeNull();
  });
});
