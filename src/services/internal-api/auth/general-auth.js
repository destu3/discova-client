import { handleResponse } from '../../../helpers/api-utils';
/**
 * Fetches the current user from the server.
 * @returns {Promise<Object>} A promise that resolves to the current user data.
 */
export const getCurrentUser = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/current-user`, {
      withCredentials: true, // Enable sending cookies
      credentials: 'include', // Include cookies in the request
    });
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.log(err); // Log any errors that occur during the request
  }
};
