const ActionButton = props => {
  const { handler, iconClassName, title, listTarget, cardBtn } = props;

  const condClass = cardBtn
    ? 'card-btn text-[#272525] p-[14px] mb-[6px] w-6 h-6'
    : 'w-9 p-6 h-9 border-[#838383] hover:border-[var(--main-text)] border-[3px] ';
  return (
    <button
      onClick={() => {
        handler(listTarget);
      }}
      title={title}
      className={`flex justify-center items-center rounded-full transition-all duration-200 ${condClass}`}
    >
      <i
        className={`${iconClassName} ${!cardBtn ? 'text-[25px]' : 'text-lg'}`}
      ></i>
    </button>
  );
};

export default ActionButton;
