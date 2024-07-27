import { describe, it, expect } from 'vitest';
import { IProduct } from '../../types/types';
import { selectedItemsSlice } from './selectedItems.slice';
import { product } from '../../__tests__/Card.test';

describe('selectedItemsSlice', () => {
  const initialState = {
    selectedItems: [] as IProduct[],
  };

  it('should handle initial state', () => {
    const nextState = selectedItemsSlice.reducer(undefined, { type: '' });
    expect(nextState).toEqual(initialState);
  });

  it('should handle selectItem', () => {
    const nextState = selectedItemsSlice.reducer(
      initialState,
      selectedItemsSlice.actions.selectItem(product)
    );
    expect(nextState.selectedItems).toHaveLength(1);
    expect(nextState.selectedItems[0]).toEqual(product);
  });

  it('should handle unselectItem', () => {
    const initialStateWithItems = {
      selectedItems: [] as IProduct[],
    };
    selectedItemsSlice.reducer(
      initialStateWithItems,
      selectedItemsSlice.actions.selectItem(product)
    );
    const nextState = selectedItemsSlice.reducer(
      initialStateWithItems,
      selectedItemsSlice.actions.unselectItem(product)
    );
    expect(nextState.selectedItems).toHaveLength(0);
  });

  it('should handle clearSelectedItems', () => {
    const initialStateWithItems = {
      selectedItems: [product] as IProduct[],
    };
    const nextState = selectedItemsSlice.reducer(
      initialStateWithItems,
      selectedItemsSlice.actions.clearSelectedItems()
    );
    expect(nextState.selectedItems).toHaveLength(0);
  });
});
