const ActionButton = ({ handler, iconClassName, title, listTarget }) => {
  return (
    <button
      onClick={() => {
        handler(listTarget);
      }}
      title={title}
      className="card-btn flex justify-center items-center rounded-full w-6 h-6 transition-all duration-200 text-[#272525] p-[14px] mb-[6px]"
    >
      <i className={iconClassName}></i>
    </button>
  );
};

export default ActionButton;
