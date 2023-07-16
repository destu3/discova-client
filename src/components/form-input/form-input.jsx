const FormInput = props => {
  const { type, placeholder, id, name, value, handler, label } = props;

  return (
    <>
      {/* Label for the input */}
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {/* Input element */}
      <input
        onChange={handler}
        type={type}
        placeholder={placeholder}
        className="form-input"
        id={id}
        value={value}
        name={name}
      />
    </>
  );
};

export default FormInput;
