import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/country.slice';
import dataListReducer from './slices/formData.slice';


const reducers = combineReducers({
  countriesReducer,
  dataListReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;