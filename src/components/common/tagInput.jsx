import React from "react";
const TagInput = ({
  name,
  label,
  error,
  options,
  inputkeydown,
  onClearArray,
  onAddItem,
  onChange,
  handleRemoveItem,
  value,

  ...rest
}) => {
  //   console.log(error.tempTag);
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <div>
        <ul className='list-group'>
          {options.map((item, i) => (
            <li className='list-group-item' key={item}>
              {item} <span onClick={() => handleRemoveItem(i)}>(x)</span>
            </li>
          ))}
        </ul>
        <input
          onChange={onChange}
          id={name}
          name={name}
          className='form-control'
          value={value}
        />
        <button type='button' onClick={onClearArray}>
          Clear All
        </button>
        <button
          type='button'
          onClick={onAddItem}
          disabled={(error = "" || error)}
        >
          Add
        </button>
      </div>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default TagInput;
