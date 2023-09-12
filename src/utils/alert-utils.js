let timerId;

// Manages the showing and hiding alerts.
export const showAlert = (message, stateSetter, err) => {
  clearTimeout(timerId);

  const type = err ? 'error' : 'success';

  stateSetter({
    message,
    type,
    visible: true,
  });

  timerId = setTimeout(() => {
    stateSetter({
      message,
      type,
      visible: false,
    });
  }, 2500);
};
