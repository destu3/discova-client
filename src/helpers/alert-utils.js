let timerId;

// Manages the showing and hiding of error alerts.
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
