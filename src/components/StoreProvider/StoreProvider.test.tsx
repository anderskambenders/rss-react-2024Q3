import { render, screen } from '@testing-library/react';
import StoreProvider from './StoreProvider';
import { vi } from 'vitest';

vi.mock('../store/store', () => ({
  store: vi.fn(() => ({
    getState: vi.fn(),
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  })),
}));

describe('StoreProvider component', () => {
  it('should render children with the Redux store', () => {
    render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
