import { describe, it, expect, beforeEach, vi } from 'vitest';
import { store as createStore } from './store';
import { productsApi } from '../service/ProductsService';
import { selectedItemsSlice } from '../store/reducers/selectedItems.slice';
import { productsSlice } from '../store/reducers/products.slice';

describe('Redux Store', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  it('should have the correct initial state for selectedItems', () => {
    const state = store.getState().selectedItems;
    expect(state).toEqual(selectedItemsSlice.getInitialState());
  });

  it('should have the correct initial state for products', () => {
    const state = store.getState().products;
    expect(state).toEqual(productsSlice.getInitialState());
  });

  it('should have the products API reducer added', () => {
    const state = store.getState()[productsApi.reducerPath];
    expect(state).toEqual(productsApi.reducer(undefined, { type: '@@INIT' }));
  });

  it('should add the products API middleware', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = productsApi.endpoints.getProducts.initiate({
      searchValue: '',
      limit: 10,
      skip: 0,
    });

    store.dispatch(action);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
