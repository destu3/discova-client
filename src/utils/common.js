export const domain = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_SERVER_DOMAIN
  : import.meta.env.VITE_PROD_SERVER_DOMAIN;

// Redirect to the home page after successful authentication
export const redirectHome = time => {
  setTimeout(() => {
    window.location.assign('/');
  }, time);
};
