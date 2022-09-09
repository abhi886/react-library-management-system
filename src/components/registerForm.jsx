import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { ToastContainer } from "react-toastify";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().label("Password"),
    name: Joi.string().required().label("Name"),
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

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div class='col-md-10 mx-auto col-lg-5'>
        <form
          className='p-4 p-md-5 border rounded-3 bg-light'
          onSubmit={this.handleSubmit}
        >
          <div className='form-floating mb-3'>
            {this.renderInput("username", "Email")}
          </div>
          <div className='form-floating mb-3'>
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className='form-floating mb-3'>
            {this.renderInput("name", "Name")}
          </div>
          <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' value='remember-me' /> Remember me
            </label>
          </div>
          {this.renderButton("Sign Up Free")}

          <hr className='my-4' />
          <small className='text-muted'>
            By clicking Sign up, you agree to the terms of use.
          </small>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
