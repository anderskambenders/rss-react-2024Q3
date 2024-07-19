import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as searchTermReducer } from './reducers/searchTerm.slice';
import { productsApi } from '../service/ProductsService';

const reducers = combineReducers({
  searchTerm: searchTermReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
