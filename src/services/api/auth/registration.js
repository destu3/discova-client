import { removeProps } from '../../../utils/object-utils';
import { handleResponse } from '../../../utils/api-utils';

// Registers a new user by making an API call to the sign-up endpoint and handling the response.
export const register = async payload => {
  // Make an API call to the sign up endpoint
  const res = await fetch('https://discova-server.onrender.com/api/sign-up', {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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

  return data.user;
};
