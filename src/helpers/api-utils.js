// Parses the response and returns data if response is ok. Throws an error with a generic error message or a specific message from the server if response is not ok.
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
