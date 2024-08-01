import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/types';

export interface SelectedItemsState {
  selectedItems: IProduct[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<IProduct>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<IProduct>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { actions, reducer } = selectedItemsSlice;
