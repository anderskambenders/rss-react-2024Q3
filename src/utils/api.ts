export const BASE_URL = `https://dummyjson.com/products`;
export const SEARCH_URL = `https://dummyjson.com/products/search?q=`;

export const getData = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  return result.products;
};
