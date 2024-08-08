import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Flyout from './Flyout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when no items are selected', () => {
    (useAppSelector as Mock).mockReturnValue([]);
    render(<Flyout />);
    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('should render when items are selected', () => {
    const mockSelectedItems = [
      {
        title: 'Item 1',
        category: 'Category 1',
        description: 'Desc 1',
        price: 10,
      },
    ];
    (useAppSelector as Mock).mockReturnValue(mockSelectedItems);
    render(<Flyout />);
    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
  });

  it('should dispatch clearSelectedItems action when "Unselect all" is clicked', () => {
    const mockDispatch = vi.fn();
    (useAppDispatch as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as Mock).mockReturnValue([
      {
        title: 'Item 1',
        category: 'Category 1',
        description: 'Desc 1',
        price: 10,
      },
    ]);

    render(<Flyout />);
    fireEvent.click(screen.getByText(/unselect all/i));
    expect(mockDispatch).toHaveBeenCalledWith(
      selectedItemsSlice.actions.clearSelectedItems()
    );
  });
});
