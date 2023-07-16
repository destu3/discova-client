/**
 * Parses the response and handles errors.
 * @param {Response} response - The response object.
 * @returns {Promise<Object>} A promise that resolves to the parsed response data.
 * @throws {Error} If the response is not successful or an error message is present in the response data.
 */
export const handleResponse = async response => {
  const data = await response.json();

  if (response.ok) return data;

  let errorMessage = 'An error occurred';

  if (data && data.message) {
    errorMessage = data.message;
  }

  throw new Error(errorMessage);
};
