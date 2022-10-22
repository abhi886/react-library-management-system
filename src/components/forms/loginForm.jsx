import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "services/authService";
import useForm from "components/customHooks/useForm";
function LoginForm() {
  const [data, SetData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, SetError] = useState({});

  const rule = {
    schema: {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
      rememberMe: Joi.boolean(),
    },
    doSubmit: async () => {
      // Call the server
      try {
        await auth.login(data.username, data.password, data.rememberMe);
        window.location = "/books";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.username = ex.response.data;
          SetError({ errors });
        }
      }
      console.log("reached here 1");
    },
    data,
    SetData,
    error,
    SetError,
  };
  const { renderInput, renderButton, renderCheckbox, submitHandler } =
    useForm(rule);

  // validate = () => {
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(this.state.data, this.schema, options);
  //   if (!error) return null;
  //   const errors = {};
  //   for (let item of error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };

  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   Joi.validate(obj, schema);
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };

  // doSubmit = async () => {
  //   // Call the server
  //   try {
  //     const { data } = this.state;
  //     await auth.login(data.username, data.password, data.rememberMe);
  //     window.location = "/movies";
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const errors = { ...this.state.errors };
  //       errors.username = ex.response.data;
  //       this.setState({ errors });
  //     }
  //   }
  // };

  // if (auth.getCurrentUser()) return <Redirect to='/' />;
  return (
    <div className='col-md-10 mx-auto col-lg-4 mt-3'>
      <h1 className='d-flex justify-content-center'>Welcome</h1>
      <p className='d-flex justify-content-center'>Login to your LMS account</p>
      <form
        className='p-4 p-md-5 border rounded-3 bg-light'
        onSubmit={submitHandler}
      >
        {renderInput({ label: "Username", name: "username" })}
        {renderInput({ label: "Password", name: "password", type: "password" })}
        {renderCheckbox({
          label: "Remember Me",
          name: "rememberMe",
          type: "checkbox",
        })}
        <div className='mt-4'>{renderButton("Login")}</div>
        <hr className='my-4' />
        <small className='text-muted'>
          Log in via SSO | Reset Password | Resend Confirmation | Unlock Account
        </small>
      </form>
    </div>
  );
}

export default LoginForm;
