import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/api';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (args) => {
        const { searchValue, limit, skip } = args;
        return {
          url: `/search?q=${searchValue}&limit=${limit}&skip=${skip}`,
        };
      },
    }),
    getProduct: build.query({
      query: (id) => `/${id}`,
    }),
  }),
});
