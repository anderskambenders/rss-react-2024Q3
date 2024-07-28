import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { mockStore } from '../../__tests__/mock/mockStore';
import { MemoryRouter } from 'react-router-dom';
import { productMock } from '../../__tests__/mock/mockStore';

describe('Card Component', () => {
  it('image is rendered', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={mockStore}>
            <Card product={productMock} page={1} />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByAltText('product image')).toBeInTheDocument();
  });
  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={mockStore}>
            <Card product={productMock} page={1} />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    const name = screen.getByText('Name: Iphone');
    expect(name).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    localStorage.setItem('valueKey', productMock.title);
    render(<App />);

    const name = await screen.findByText('Name: Essence Mascara Lash Princess');
    fireEvent.click(name);

    const descriptionElement = await screen.findByText(
      'Essence Mascara Lash Princess'
    );
    expect(descriptionElement).not.toBeNull();
  });
});
