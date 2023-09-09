import { handleResponse } from '../../../helpers/api-utils';

// Fetches the current user
export const getCurrentUser = async () => {
  try {
    const res = await fetch(
      `https://discova-server.onrender.com/api/current-user`,
      {
        withCredentials: true, // Enable sending cookies
        credentials: 'include', // Include cookies in the request
      }
    );
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.log(err.message + ' ' + 'or no User is currently logged in');
  }
};
