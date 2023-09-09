// Redirect to the home page after successful authentication

export const redirectHome = time => {
  setTimeout(() => {
    window.location.assign('/');
  }, time);
};
