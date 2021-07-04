import React from "react";
// import { Link } from "react-router-dom";
const Dropdown = ({ name, label, options, error, ...rest }) => {
  //   console.log(this.props);
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} {...rest} className='form-control' id={name}>
        <option value='' />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Dropdown;
