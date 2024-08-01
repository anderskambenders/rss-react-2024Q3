import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';

const productDetails = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  brand: 'Essence',
};

describe('Card details component', () => {
  it('Smoke check', async () => {
    const app = render(<App />);
    expect(app).not.toBeNull();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(<App />);
    const name = await screen.findByText(`${productDetails.title}`);
    fireEvent.click(name);
    const descriptionElement = await screen.findByText(
      `Description: ${productDetails.description}`
    );
    await waitFor(() => {
      expect(descriptionElement).not.toBeNull();
    });
    const buttonElement = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(buttonElement);
    await waitFor(() => {
      const descriptionElement = screen.queryByText(
        `Description: ${productDetails.description}`
      );
      expect(descriptionElement).toBeNull();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<App />);

    const name = await screen.findByText(`${productDetails.title}`);
    fireEvent.click(name);

    const descriptionField = await screen.findByText(
      `Description: ${productDetails.description}`
    );
    expect(descriptionField).not.toBeNull();
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(<App />);
    const name = await screen.findAllByText(productDetails.title);
    fireEvent.click(name[0]);
    const loader = screen.findByTestId('loading');
    expect(loader).not.toBeNull();
  });
});
