import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/api';
import { productsSlice } from '../store/reducers/products.slice';
import { HYDRATE } from 'next-redux-wrapper';

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (args) => {
        const { searchValue, limit, skip } = args;
        return {
          url: `/search?q=${searchValue}&limit=${limit}&skip=${skip}`,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setListData } = productsSlice.actions;
        const data = await queryFulfilled;
        dispatch(setListData(data.data));
      },
    }),

    getProduct: build.query({
      query: (id) => `/${id}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setProductData } = productsSlice.actions;
        const data = await queryFulfilled;
        dispatch(setProductData(data.data));
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  util: { getRunningQueriesThunk },
} = productsApi;
export const { getProducts, getProduct } = productsApi.endpoints;
