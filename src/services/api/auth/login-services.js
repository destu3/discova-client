import { removeProps } from '../../../utils/object-utils';
import { handleResponse } from '../../../utils/api-utils';
import { domain } from '../../../utils/common';

// Logs in a user using the specified email and password by making an API call.
export const login = async (email, password) => {
  // Make an API call to the login endpoint
  const res = await fetch(`${domain}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, password }),
  });

  // Process the API response and handle potential errors
  const data = await handleResponse(res);

  // Remove sensitive properties from the user data before storing it in local storage
  removeProps(
    data.user,
    '_id',
    'profilePicture',
    'username',
    'watchList',
    'favourites'
  );

  // Store the user data and token in the local storage to persist the user session
  localStorage.setItem('currentUser', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);

  return data.user;
};
