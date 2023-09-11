import { handleResponse } from '../../utils/api-utils';
import { domain } from '../../utils/common';

const updateLocalStorage = (updatedList, listType) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUser[listType] = updatedList;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const addEntryToList = async (animeId, listType) => {
  const res = await fetch(`${domain}/api/user/list/${animeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ listType }),
  });
  const { updatedList } = await handleResponse(res);
  updateLocalStorage(updatedList, listType);

  return updatedList;
};

export const removeAnimeFromList = async (animeId, listType) => {
  const res = await fetch(`${domain}/api/user/list/${animeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ listType }),
  });
  const { updatedList } = await handleResponse(res);
  updateLocalStorage(updatedList, listType);

  return updatedList;
};
