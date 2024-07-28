import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../../service/ProductsService';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../types/types';

interface SearchTermState {
  searchTerm: string;
}

export const productMock = {
  id: 1,
  title: 'Iphone',
  description: 'Description: SIM-Free,',
  price: 1000,
  discountPercentage: 10,
  rating: 10,
  stock: 4,
  brand: 'apple',
  category: 'phones',
  thumbnail: ['moc, apple'],
  species: ['red', 'blue'],
  images: ['image.png'],
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: {
    searchTerm: localStorage.getItem('valueKey') || '',
  },
  reducers: {
    set: (state: SearchTermState) => {
      state.searchTerm = '';
    },
  },
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productsCount: 0,
  },
  reducers: {
    update: (state) => {
      state.products = [];
      state.productsCount = 100;
    },
  },
});

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
    selectItem: (state) => {
      state.selectedItems = [];
    },
    unselectItem: (state) => {
      state.selectedItems = [];
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

const reducers = combineReducers({
  searchTerm: searchTermSlice.reducer,
  selectedItems: selectedItemsSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  products: productsSlice.reducer,
});

export const mockStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
