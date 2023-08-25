import { handleResponse } from '../../helpers/api-utils';

// Performs a search based on the given query parameters.
export const search = async query => {
  const { search, page } = query;
  let params = `search=${search}&page=${page}`;

  if (query.genres && query.genres.size > 0) {
    const arr = [...query.genres];
    params += `&genres=${arr.join(',')}`;
  }

  if (query.season) params += `&season=${query.season.toUpperCase()}`;

  if (query.year) params += `&seasonYear=${query.year}`;

  const endpoint = `http://127.0.0.1:8000/api/anime/search?${params}`;

  const res = await fetch(endpoint);
  const data = await handleResponse(res);
  return data;
};

// retrieves information about an anime
export const getAnimeInfo = async id => {
  const res = await fetch(`http://127.0.0.1:8000/api/anime/${id}`);
  const data = await handleResponse(res);
  return data;
};

// retrieves theme data for an anime
export const getThemes = async id => {
  const res = await fetch(`http://127.0.0.1:8000/api/anime/themes/${id}`);
  const data = await handleResponse(res);
  return data;
};
