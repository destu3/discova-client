import { handleResponse, getFeaturedContent } from '../../utils/api-utils';

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

  const endpoint = `https://discova-server.onrender.com/api/anime/search?${params}`;

  const res = await fetch(endpoint);
  const data = await handleResponse(res);
  return data;
};

// retrieves information about an anime
export const getAnimeInfo = async id => {
  const res = await fetch(
    `https://discova-server.onrender.com/api/anime/${id}`
  );
  const data = await handleResponse(res);
  return data;
};

// retrieves theme data for an anime
export const getThemes = async id => {
  const res = await fetch(
    `https://discova-server.onrender.com/api/anime/themes/${id}`
  );
  const data = await handleResponse(res);
  return data;
};

export const getWatchlistAnime = async () => {
  const res = await fetch(
    `https://discova-server.onrender.com/api/anime/details-by-ids`,
    {
      withCredentials: true, // Enable sending cookies
      credentials: 'include', // Include cookies in the request
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
  const data = await handleResponse(res);
  return data;
};

// Function to fetch popular anime for current season
export const getPopularThisSeason = () => {
  const mediaArray = getFeaturedContent(
    `https://discova-server.onrender.com/api/anime/featured/popular-this-season`
  );

  return mediaArray;
};

// Function to fetch trending anime
export const getTrending = () => {
  const mediaArray = getFeaturedContent(
    `https://discova-server.onrender.com/api/anime/featured/trending`
  );
  return mediaArray;
};

// Function to fetch upcoming anime for next season
export const getUpcoming = () => {
  const mediaArray = getFeaturedContent(
    `https://discova-server.onrender.com/api/anime/featured/upcoming`
  );
  return mediaArray;
};

// Function to fetch popular anime
export const getPopular = () => {
  const mediaArray = getFeaturedContent(
    `https://discova-server.onrender.com/api/anime/featured/popular`
  );
  return mediaArray;
};
