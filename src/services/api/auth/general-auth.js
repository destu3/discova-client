import { domain } from '../../../utils/common';
import { handleResponse } from '../../../helpers/api-utils';

// Fetches the current user
export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${domain}/api/current-user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.log(err.message + ' ' + 'or no User is currently logged in');
  }
};
