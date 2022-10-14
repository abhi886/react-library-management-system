import React, { useState } from "react";
import Joi from "joi-browser";

function TagInput({ value, addItem, removeItem, errorParent }) {
  const [label] = useState("BookCode");
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
    <>
      <div className='d-flex flex-row flex-wrap'>
        {value.map((item, i) => (
          <div className='p-2 border border-primary ms-2' key={i}>
            {item}
            <span onClick={() => removeItem(i)}>&nbsp;(x)</span>
          </div>
        ))}
      </div>
      <div className='form-floating mt-3 mb-3'>
        <input
          className='form-control'
          onChange={handleChange}
          id={label}
          name='tag'
          value={tagValue}
          placeholder={"text"}
          type={"text"}
        />
        <label htmlFor={`${label} floatingInput`}>{label}</label>
        <button
          className={`mt-2 ${tagValue && "btn btn-primary"}`}
          type='button'
          onClick={() => handleAddItem(tagValue)}
          disabled={showButton}
        >
          Add
        </button>

        {errors && <div className='alert alert-danger mt-2'>{errors}</div>}
        {errorParent && <div className='alert alert-danger'>{errorParent}</div>}
      </div>
    </>
  );
}

export default TagInput;
