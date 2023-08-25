import { removeProps } from '../../../helpers/object-utils';
import { handleResponse } from '../../../helpers/api-utils';

// Logs in a user using the specified email and password by making an API call.
export const login = async (email, password, setAlert, alertOptions) => {
  // Make an API call to the login endpoint
  const res = await fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // Process the API response and handle potential errors
  const data = await handleResponse(res);

  // Remove sensitive properties from the user data before storing it in local storage
  removeProps(data.user, '_id', 'profilePicture', 'username', 'watchList');

  // Store the user data in the local storage to persist the user session
  localStorage.setItem('currentUser', JSON.stringify(data.user));

  // Invoke the provided callback to display an alert message
  setAlert({
    ...alertOptions,
    message: `Welcome back ${data.user.username}`,
  });

  // Redirect to the home page after a short delay
  setTimeout(() => {
    window.location.assign('/');
  }, 1500);
};
