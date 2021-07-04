import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

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

  doSubmit = () => {
    // Call the server
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={data.username}
            label='usernname'
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name='password'
            value={data.password}
            label='password'
            onChange={this.handleChange}
            error={errors.password}
          />

          <button disabled={this.validate()} className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
