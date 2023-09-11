import { removeProps } from '../../../utils/object-utils';
import { handleResponse } from '../../../utils/api-utils';
import { domain } from '../../../utils/common';

// Registers a new user by making an API call to the sign-up endpoint and handling the response.
export const register = async payload => {
  // Make an API call to the sign up endpoint
  const res = await fetch(`${domain}/api/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
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

  // Store the user data in the local storage to persist the user session
  localStorage.setItem('currentUser', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);

  return data.user;
};
