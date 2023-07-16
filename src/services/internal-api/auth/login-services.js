import { removeProps } from '../../../helpers/object-utils';
import { handleResponse } from '../../../helpers/api-utils';

// logging in using api
export const login = async (email, password) => {
  const res = await fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);

  // will add a more user friendly indicator eventually
  console.log('successfully logged in');
  removeProps(data.user, '_id', 'profilePicture');
  localStorage.setItem('currentUser', JSON.stringify(data.user));

  // reload
  window.location.assign('/');

  return data;
};
