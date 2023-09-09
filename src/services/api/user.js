import { handleResponse } from '../../utils/api-utils';

const updateLocalStorage = (updatedList, listType) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUser[listType] = updatedList;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const addEntryToList = async (animeId, listType) => {
  const res = await fetch(
    `https://discova-server.onrender.com/api/user/list/${animeId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listType }),
      withCredentials: true,
      credentials: 'include',
    }
  );
  const { updatedList } = await handleResponse(res);
  updateLocalStorage(updatedList, listType);

  return updatedList;
};

export const removeAnimeFromList = async (animeId, listType) => {
  const res = await fetch(
    `https://discova-server.onrender.com/api/user/list/${animeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listType }),
      withCredentials: true,
      credentials: 'include',
    }
  );
  const { updatedList } = await handleResponse(res);
  updateLocalStorage(updatedList, listType);

  return updatedList;
};
