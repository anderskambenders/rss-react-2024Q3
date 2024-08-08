import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as selectedItemsReducer } from './reducers/selectedItems.slice';
import { reducer as productsReducer } from './reducers/products.slice';

import { productsApi } from '../service/ProductsService';
import { createWrapper } from 'next-redux-wrapper';

const reducers = combineReducers({
  selectedItems: selectedItemsReducer,
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = () =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

type StoreType = ReturnType<typeof store>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
export const wrapper = createWrapper(store);
