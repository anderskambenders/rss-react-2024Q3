export const baseUrl = (limit: number, skip: number) =>
  `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

export const searchUrl = (searchString: string) =>
  `https://dummyjson.com/products/search?q=${searchString}`;

export async function getProduct(id: number) {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid product ID');
  }
  const request = await fetch(`https://dummyjson.com/products/${id}`);
  const response = await request.json();
  return response;
}
