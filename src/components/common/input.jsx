import React from "react";
const Input = ({ name, label, error, type, ...rest }) => {
  return (
    <div class='form-floating mb-3'>
      <input
        {...rest}
        id={`${name} `}
        name={name}
        placeholder={type}
        type={type}
      />
      <label htmlFor={`${name} floatingInput`}>{label}</label>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
