import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as searchTermReducer } from './reducers/searchTerm.slice';

const reducers = combineReducers({
  searchTerm: searchTermReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
