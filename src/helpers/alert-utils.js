let timerId;
/**

Manages the showing and hiding of error alerts.
@param {Error} err - The error object.
@param {Object} state - The current state object.
@param {Function} stateSetter - The state setter function.
*/
export const manageAlert = (err, state, stateSetter) => {
  clearTimeout(timerId);
  stateSetter({
    ...state,
    message: err.message,
    type: 'error',
    visible: true,
  });
  timerId = setTimeout(() => {
    stateSetter({
      ...state,
      message: err.message,
      visible: false,
    });
  }, 4000);
};
