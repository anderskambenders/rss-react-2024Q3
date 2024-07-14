export const baseUrl = (limit: number, skip: number) =>
  `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

export const searchUrl = (searchString: string) =>
  `https://dummyjson.com/products/search?q=${searchString}`;
