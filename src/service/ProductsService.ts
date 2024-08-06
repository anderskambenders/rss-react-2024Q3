// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../utils/api';

// export const productsApi = createApi({
//   reducerPath: 'productsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${BASE_URL}`,
//   }),
//   endpoints: (build) => ({
//     getProducts: build.query({
//       query: (args) => {
//         const { searchValue, limit, skip } = args;
//         return {
//           url: `/search?q=${searchValue}&limit=${limit}&skip=${skip}`,
//         };
//       },
//     }),
//     getProduct: build.query({
//       query: (id) => `/${id}`,
//     }),
//   }),
// });

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/api';
import { productsSlice } from '../store/reducers/products.slice';

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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

// export const {
//   useGetProductsQuery,
//   useGetProductQuery,
//   util: { getRunningQueriesThunk },
// } = productsApi;
// export const { getProducts, getProduct } = productsApi.endpoints;
