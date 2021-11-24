import React, { useState } from "react";
import Joi from "joi-browser";

function TagInput({ value, addItem, removeItem, errorParent }) {
  const [label] = useState("Book Code");
  const [tagValue, SetTagValue] = useState("");
  const [errors, SetErrors] = useState("");
  const [showButton, SetShowButton] = useState(true);

  const schema = {
    tag: Joi.string().min(3).max(30).required().label("Book Code"),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    Joi.validate(obj, schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : "";
  };

  const handleChange = ({ currentTarget: input }) => {
    SetTagValue(input.value);
    const errors = validateProperty(input);
    SetErrors(errors || "");
    errors ? SetShowButton(true) : SetShowButton(false);
    return;
  };

  const handleAddItem = (val) => {
    SetShowButton(true);
    addItem(val);
    SetTagValue("");
  };
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
      <div>
        <ul className='list-group'>
          {value.map((item, i) => (
            <li
              className='list-group-item d-flex justify-content-between align-items-cente'
              key={i}
            >
              {item}
              <span onClick={() => removeItem(i)}>(x)</span>
            </li>
          ))}
        </ul>
        <input
          onChange={handleChange}
          // id={name}
          name='tag'
          //   className='form-control'
          value={tagValue}
        />
        {/* <button type='button' onClick={onClearArray}>
              Clear All
            </button> */}
        <button
          type='button'
          onClick={() => handleAddItem(tagValue)}
          disabled={showButton}
        >
          Add
        </button>
      </div>
      {errors && <div className='alert alert-danger'>{errors}</div>}
      {errorParent && <div className='alert alert-danger'>{errorParent}</div>}
    </div>
  );
}

export default TagInput;
