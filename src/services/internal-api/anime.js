import { handleResponse } from '../../helpers/api-utils';

/**
 * Performs a search based on the given query parameters.
 * @param {Object} query - The query parameters for the search.
 * @param {string} query.search - The search term.
 * @param {number} query.page - The page number for pagination.
 * @param {Set} query.genres - The set of genres to filter by.
 * @param {string} query.season - The season to filter by.
 * @param {number} query.year - The year to filter by.
 * @returns {Promise<Object>} A promise that resolves to the search results.
 */
export const search = async query => {
  const { search, page } = query;
  let params = `search=${search}&page=${page}`;

  if (query.genres && query.genres.size > 0) {
    const arr = [...query.genres];
    params += `&genres=${arr.join(',')}`;
  }

  if (query.season) params += `&season=${query.season.toUpperCase()}`;

  if (query.year) params += `&seasonYear=${query.year}`;

  const endpoint = `http://127.0.0.1:8000/api/search?${params}`;

  const res = await fetch(endpoint);
  const data = await handleResponse(res);
  return data;
};
