export const BASE_URL = `https://swapi.dev/api/people/`;
export const SEARCH_URL = `https://swapi.dev/api/people/?search=`;

export const getData = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  return result.results;
};
