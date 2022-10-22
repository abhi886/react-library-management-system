import React from "react";
// import { Link } from "react-router-dom";
const Dropdown = ({ name, label, options, error, ...rest }) => {
  //   console.log(this.props);
  return (
    <div className='form-floating mb-3'>
      <select
        name={name}
        {...rest}
        className='form-select'
        id={name}
        aria-label='Select Genre'
      >
        <option value='' />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      <label htmlFor={`${name} floatingInput`}>{label}</label>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Dropdown;
