/**
 * Parses the response and returns data if response is ok. Throws an error with a generic error message or a specific message from the server if response is not ok.
 * @param {Response} response - The response object.
 * @returns {Promise<Object>} A promise that resolves to the parsed response data.
 * @throws {Error} If the response is not successful or an error message is present in the response data.
 */
export const handleResponse = async response => {
  const result = await response.json();

  if (response.ok) return result;

  let errorMessage;

  if (result) {
    errorMessage =
      result.message || result.errors[0].message || 'An error occurred';
  }

  throw new Error(errorMessage);
};
