import { handleResponse } from '../../helpers/api-utils';

// retrieves theme data for an anime
export const getTracks = async themes => {
  const res = await fetch(`http://127.0.0.1:8000/api/anime/tracks/spotify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ themes }),
  });
  const data = await handleResponse(res);
  return data;
};
