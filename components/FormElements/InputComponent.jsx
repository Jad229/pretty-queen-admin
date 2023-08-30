function InputComponent({ value, type, id, label, placeholder, onChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default InputComponent;
