import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchTermState {
  searchTerm: string;
}

const initialState: SearchTermState = {
  searchTerm: '',
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    set: (state: SearchTermState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { actions, reducer } = searchTermSlice;
