import React, { Component } from "react";
import Input from "./input";
import TagInput from "./tagInput";
import Dropdown from "./dropdown";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  onCheckboxClicked = () => {
    const data = { ...this.state.data };
    data["rememberMe"] = !data["rememberMe"];
    this.setState({ data });
  };

  // onClearArray = () => {
  //   console.log("reached here");
  //   const data = { ...this.state.data };
  //   data["tag"] = [];
  //   this.setState({ data });
  // };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    Joi.validate(obj, schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button type='submit' className='w-100 btn btn-lg btn-primary'>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        className='form-control'
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderTagInput(name, label, options) {
    const { data, errors } = this.state;
    return (
      <TagInput
        // type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleTagChange}
        error={errors[name]}
        options={options}
        onClearArray={this.onClearArray}
        onAddItem={this.onAddItem}
        handleRemoveItem={this.handleRemoveItem}
        validate={this.state.errors}
      />
    );
  }
  renderDropdown(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Dropdown
        options={options}
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckbox(name, label, type) {
    const { data } = this.state;
    return (
      <div className='checkbox mb-3'>
        <label>
          <input
            type={type}
            value={data[name]}
            onClick={this.onCheckboxClicked}
          />{" "}
          Remember me
        </label>
      </div>
    );
  }
}

export default Form;

// export default function renderInput();
